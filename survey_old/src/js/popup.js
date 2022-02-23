const setCurrentSection = () => {
    chrome.storage.local.get(null, (obj) => {
        user = obj.user

        console.log('user', user);
        if(!user) {
            toggleDisplay("userForm", "block");
            return;
        }
    
        toggleDisplay("userForm", "none");
    
        if(user.role === 'leader') {
            toggleDisplay("leaderSection", "block");

            return;
        }

        if(user.role === 'member') {
            toggleDisplay("memberSection", "block");

            if(user.team) {
                toggleDisplay("memberHomeSection", "block");
                return;
            }

            toggleDisplay("memberAssocSection", "block");
            return;
        }
    })

}

setCurrentSection();

const createUser = async () => {
    let userData = {
        name: document.getElementById("userName").value,
        role: document.getElementById("userRole").value,
    };

    let hermes = new Hermes('http://localhost:3000/user', 'POST', userData);
    try {
        let response = await hermes.run();
        await saveObjectInLocalStorage({"user": response.data})
        await setCurrentSection();
    } catch (error) {
        console.log(error);
    }
}

appendElementFunction("createUserButton", createUser);

const createTeam = async () => {
    let teamCode = `${generateRandomString()}-${generateRandomString()}`;

    let hermes = new Hermes('http://localhost:3000/team', 'POST', {code: teamCode, name: "teste"});
    try {
        let response = await hermes.run();
        await saveObjectInLocalStorage({"team": response.data});
        displayTeamCode();
    } catch (error) {
        console.log(error);
    }
}

appendElementFunction("createTeamButton", createTeam);

const displayTeamCode = () => {
    chrome.storage.local.get(null, function (obj) {
        document.getElementById("teamCodeInputDisabled").value = obj.team.code;
        document.getElementById("teamCode").style.display = "block";
    });
}

const copyTeamCode = () => {
    let teamCodeInputDisabled = document.getElementById("teamCodeInputDisabled");
    teamCodeInputDisabled.select();
    navigator.clipboard.writeText(teamCodeInputDisabled.value);
    alert("Código copiado com sucesso!");
}

appendElementFunction("copyTeamCodeIcon", copyTeamCode);

const assocMember = async () => {
    let teamCode = document.getElementById("teamCodeInput").value;
    let user = await getStorageData("user");

    let hermes = new Hermes('http://localhost:3000/user/assoc', 'POST', { userId: user._id, teamCode });
    try {
        let response = await hermes.run();
        await saveObjectInLocalStorage({"user": response.data});
        setCurrentSection();
    } catch (error) {
        console.log(error);
    }
}

appendElementFunction("assocMemberButtom", assocMember);
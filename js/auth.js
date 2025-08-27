//const loginButton = document.querySelector("#signupForm input[type='submit']");
const signupButton = document.querySelector("#signupForm input[type='submit']");
if (signupButton) {
    signupButton.addEventListener('click', function(e) {
        e.preventDefault();
        
         const username = document.getElementById("username").value;  
        const password = document.getElementById("password").value;  
        const passwordconfirm = document.getElementById("passwordConfirm").value; 
        const name = document.getElementById("name").value;

        //비번 확인 
        if (password !== passwordconfirm) {
        alert("비밀번호가 일치하지 않습니다."); // 다르면 경고창 표시 : 실행 o
        return; // 함수 종료
    }
    // 3. LocalStorage에 사용자 정보 저장
    const newUser = {
        username: username,
        password: password, // 실제로는 암호화 필요
        passwordconfirm: passwordconfirm,
        name: name,
        joinDate: new Date().toISOString().split('T')[0] //가입 날짜
    };
    
    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users') || '[]');

     // 중복 아이디 있는지 검사 : 실행o
    const exists = users.some(u => u.username === username); 
    if (exists) {
        alert("이미 존재하는 아이디입니다."); // 중복이면 알림
        return; // 함수 종료 
    }
    users.push(newUser); //새 회원 추가
    
    // 업데이트된 사용자 목록 저장
    localStorage.setItem('users', JSON.stringify(users));
    
    // 4. 성공 메시지 표시
    console.log("회원가입이 완료되었습니다.")
    
    // 폼 초기화
    clearForm();
    window.location.href = "index.html"; //로그인 페이지로 이동


    return true;
});
}



// -------------------- 로그인 처리 --------------------


const loginForm = document.getElementById("loginForm");

if (loginForm) { // index.html일 때만 실행
    const loginButton = loginForm.querySelector("button[type='submit']");
    const messageDiv = document.getElementById("message"); // 로그인 결과 출력

    // 로그인 버튼 클릭 이벤트 리스너
    loginButton.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 form 제출 막기

        // 입력값 가져오기
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // localStorage에서 사용자 목록 가져오기
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // 아이디와 비밀번호가 일치하는 회원 찾기
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // 로그인 성공 시 메시지 표시
            messageDiv.textContent = `${user.name}님 환영합니다!`;
            console.log("로그인 성공:", user);
        } else {
            // 로그인 실패 시 메시지 표시
            messageDiv.textContent = "아이디 또는 비밀번호가 잘못되었습니다.";
            console.log("로그인 실패");
        }
    });
}

// 폼 초기화 함수
function clearForm() {
    document.getElementById("signupForm").reset();
}
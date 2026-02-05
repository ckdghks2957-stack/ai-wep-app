document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const appContainer = document.getElementById('app');

    // --- Survey Questions Data ---
    const interestQuestions = [
        "생성형 AI 기술 및 최신 트렌드에 대해 정기적으로 찾아봅니다.",
        "새로운 생성형 AI 도구가 나오면 직접 사용해보고 기능을 탐색합니다.",
        "생성형 AI 관련 뉴스레터, 블로그, 소셜 미디어 채널을 구독하고 있습니다.",
        "생성형 AI가 가져올 미래 변화에 대해 주변 사람들과 자주 이야기합니다.",
        "생성형 AI를 활용한 성공 사례나 흥미로운 적용 사례를 보면 깊이 탐구합니다.",
        "생성형 AI 관련 온라인 강의나 세미나에 참여하는 것에 긍정적입니다.",
        "생성형 AI의 발전 방향이나 한계점에 대해 비판적으로 고민해 본 적이 있습니다.",
        "개인적인 취미나 관심사에 생성형 AI를 접목할 방법을 고민합니다.",
        "생성형 AI가 업무 생산성을 혁신할 것이라고 생각합니다.",
        "생성형 AI가 아직은 초기 단계이며, 더 많은 발전이 필요하다고 생각합니다."
    ];

    const usageQuestions = [
        "생성형 AI를 활용하여 정보 검색 및 자료 조사를 수행합니다.",
        "생성형 AI를 사용하여 문서 초안 작성, 요약, 번역 등 텍스트 작업을 합니다.",
        "생성형 AI 도구(예: Midjourney, DALL-E)로 이미지, 영상, 오디오 등 콘텐츠를 생성합니다.",
        "생성형 AI를 활용하여 데이터 분석, 코딩 보조, 아이디어 도출 등 업무 효율을 높입니다.",
        "생성형 AI의 프롬프트(명령어) 작성 기법을 학습하고 실무에 적용합니다.",
        "생성형 AI를 활용하면서 발생할 수 있는 윤리적, 법적 문제에 대해 인지하고 있습니다.",
        "생성형 AI 활용법을 동료나 지인에게 가르쳐주거나 공유한 경험이 있습니다.",
        "자신이 하는 일에 생성형 AI를 통합하는 자동화 워크플로우를 구축해 본 경험이 있습니다."
    ];

    // --- Global Data Storage (Client-side simulation) ---
    // NOTE: This will be replaced by actual API calls to Google Apps Script.
    // For now, it simulates an empty state or pre-loaded data.
    let allSessions = []; 

    // --- Backend API Simulation (will be replaced by actual GAS calls) ---
    // Placeholder URL for your deployed Google Apps Script Web App
    // IMPORTANT: Replace this with your actual GAS Web App URL after deployment
    const GAS_WEB_APP_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'; 

    async function apiCall(action, payload = {}) {
        console.log(`API Call - Action: ${action}, Payload:`, payload);
        // This is where you would make a fetch request to your GAS Web App
        // Example:
        // const response = await fetch(`${GAS_WEB_APP_URL}?action=${action}`, {
        //     method: 'POST', // or 'GET' depending on your GAS doGet/doPost
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(payload),
        // });
        // return response.json();

        // --- SIMULATION ONLY ---
        // Replace this entire simulation block with actual fetch calls to your GAS Web App
        return new Promise(resolve => {
            setTimeout(() => {
                let result = {};
                switch (action) {
                    case 'GET_ALL_SESSIONS':
                        // In a real scenario, GAS would fetch from Google Sheet
                        result = allSessions; 
                        break;
                    case 'CREATE_SESSION':
                        let newCode;
                        do {
                            newCode = Math.floor(1000 + Math.random() * 9000).toString();
                        } while (allSessions.some(session => session.code === newCode));
                        const newSession = { code: newCode, users: [], createdAt: new Date().toISOString() };
                        allSessions.push(newSession);
                        console.log(`[SIMULATION] Created session: ${newCode}`);
                        result = { success: true, sessionCode: newCode };
                        break;
                    case 'GET_SESSION_DETAILS':
                        const session = allSessions.find(s => s.code === payload.sessionCode);
                        result = { success: !!session, session: session };
                        break;
                    case 'SUBMIT_USER_DATA':
                        const targetSession = allSessions.find(s => s.code === payload.sessionCode);
                        if (targetSession) {
                            targetSession.users.push(payload.userData);
                            console.log(`[SIMULATION] User data submitted to session ${payload.sessionCode}:`, payload.userData);
                            result = { success: true };
                        } else {
                            result = { success: false, message: 'Session not found' };
                        }
                        break;
                    case 'GET_SESSION_USERS':
                        const sessionToGetUsers = allSessions.find(s => s.code === payload.sessionCode);
                        result = { success: !!sessionToGetUsers, users: sessionToGetUsers ? sessionToGetUsers.users : [] };
                        break;
                    case 'DELETE_SESSION':
                        const initialLength = allSessions.length;
                        allSessions = allSessions.filter(s => s.code !== payload.sessionCode);
                        console.log(`[SIMULATION] Deleted session: ${payload.sessionCode}`);
                        result = { success: allSessions.length < initialLength };
                        break;
                    default:
                        result = { success: false, message: 'Unknown API action' };
                }
                resolve(result);
            }, 500); // Simulate network delay
        });
        // --- END SIMULATION ---
    }


    // --- Initial Render ---
    // Load initial sessions from simulated backend
    apiCall('GET_ALL_SESSIONS').then(sessions => {
        allSessions = sessions;
        showWelcomeScreen();
    });
    

    // --- Functions ---
    function showWelcomeScreen() {
        const welcomeHTML = `
            <section id="welcome-screen" class="text-center fade-in float-up">
                <h1 class="text-4xl font-['Gowun_Batang'] mb-4 text-gray-100">AI Insight</h1>
                <p class="text-lg text-gray-400 mb-8">생성형 AI 활용능력 진단</p>
                <div class="max-w-sm mx-auto">
                    <div class="glass-card p-8 rounded-lg shadow-lg border border-gray-700">
                        <label for="session-code" class="block text-lg font-medium text-gray-300 mb-4">세션 코드를 입력하세요</label>
                        <input type="text" id="session-code" class="w-full px-4 py-3 text-2xl text-center tracking-widest border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400 bg-gray-900 text-gray-100" placeholder="_ _ _ _" maxlength="4">
                        <button id="start-btn" class="w-full mt-6 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                            진단 시작하기
                        </button>
                        <p class="text-xs text-gray-500 mt-4">강사/관리자이신가요? <a href="#" id="admin-login-btn" class="text-blue-400 hover:underline">관리자 모드로 이동</a></p>
                    </div>
                </div>
            </section>
        `;
        appContainer.innerHTML = welcomeHTML;

        // Add event listeners for the welcome screen
        document.getElementById('start-btn').addEventListener('click', handleStart);
        document.getElementById('admin-login-btn').addEventListener('click', handleAdminLogin);
    }

    async function handleStart() {
        const sessionCodeInput = document.getElementById('session-code');
        const sessionCode = sessionCodeInput.value.trim();
        
        if (sessionCode.length === 4 && !isNaN(sessionCode)) {
            const response = await apiCall('GET_SESSION_DETAILS', { sessionCode });
            if (response.success && response.session) {
                console.log(`세션 코드 ${sessionCode}으로 진단을 시작합니다.`);
                renderStep0(sessionCode);
            } else {
                alert('존재하지 않는 세션 코드입니다. 관리자에게 문의해주세요.');
            }
        } else {
            alert('유효한 4자리 숫자 코드를 입력해주세요.');
        }
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        console.log('관리자 로그인 화면으로 이동합니다.');
        showAdminLogin();
    }

    function renderStep0(sessionCode) {
        const welcomeScreen = document.getElementById('welcome-screen');
        welcomeScreen.classList.add('fade-out');

        setTimeout(() => {
            appContainer.innerHTML = ''; // Clear previous content
            const step0HTML = `
                <section id="step0-screen" class="fade-in float-up">
                    <div class="glass-card p-8 shadow-lg border border-gray-700">
                        <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">Step 0: 기본 정보 입력</h2>
                        <div class="space-y-6">
                            <div>
                                <label for="user-name" class="block text-lg font-medium text-gray-300 mb-2">당신의 이름은 무엇인가요?</label>
                                <input type="text" id="user-name" class="w-full px-4 py-2 border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400 bg-gray-900 text-gray-100" placeholder="이름을 입력하세요">
                            </div>
                            <div class="matrix-questions space-y-4">
                                <p class="text-lg font-medium text-gray-400">AI 활용에 대한 당신의 생각을 알려주세요.</p>
                                <div class="question-item p-3 bg-gray-800/50 rounded-lg">
                                    <label class="text-md text-gray-300 font-semibold">1. 현재 업무/학습에 생성형 AI를 얼마나 다양하게 활용하고 있나요?</label>
                                    <div class="flex flex-wrap justify-around pt-2">
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="tools-count" value="1" class="form-radio h-5 w-5 text-blue-400"><span>거의 안 씀 (0-1개)</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="tools-count" value="3" class="form-radio h-5 w-5 text-blue-400"><span>가끔 활용 (2-3개)</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="tools-count" value="5" class="form-radio h-5 w-5 text-blue-400"><span>자주 활용 (4개 이상)</span></label>
                                    </div>
                                </div>
                                <div class="question-item p-3 bg-gray-800/50 rounded-lg">
                                    <label class="text-md text-gray-300 font-semibold">2. 생성형 AI 서비스에 비용을 지불하고 사용한 경험이 있나요?</label>
                                    <div class="flex flex-wrap justify-around pt-2">
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="paid-experience" value="1" class="form-radio h-5 w-5 text-blue-400"><span>없음</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="paid-experience" value="3" class="form-radio h-5 w-5 text-blue-400"><span>고민 중</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="paid-experience" value="5" class="form-radio h-5 w-5 text-blue-400"><span>있음</span></label>
                                    </div>
                                </div>
                                <div class="question-item p-3 bg-gray-800/50 rounded-lg">
                                    <label class="text-md text-gray-300 font-semibold">3. 앞으로 생성형 AI를 얼마나 적극적으로 활용할 계획인가요?</label>
                                    <div class="flex flex-wrap justify-around pt-2">
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="future-intent" value="1" class="form-radio h-5 w-5 text-blue-400"><span>보수적</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="future-intent" value="3" class="form-radio h-5 w-5 text-blue-400"><span>보통</span></label>
                                        <label class="flex items-center space-x-2 m-1"><input type="radio" name="future-intent" value="5" class="form-radio h-5 w-5 text-blue-400"><span>적극적</span></label>
                                    </div>
                                </div>
                            </div>
                            <button id="next-step1-btn" class="w-full mt-8 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                                다음 단계로 <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </section>
            `;
            appContainer.innerHTML = step0HTML;

            document.getElementById('next-step1-btn').addEventListener('click', () => {
                const userName = document.getElementById('user-name').value;
                const toolsCount = document.querySelector('input[name="tools-count"]:checked');
                const paidExperience = document.querySelector('input[name="paid-experience"]:checked');
                const futureIntent = document.querySelector('input[name="future-intent"]:checked');

                if (!userName || !toolsCount || !paidExperience || !futureIntent) {
                    alert('모든 항목에 응답해주세요.');
                    return;
                }

                const userData = {
                    sessionCode,
                    name: userName,
                    passionScores: {
                        tools: parseInt(toolsCount.value),
                        paid: parseInt(paidExperience.value),
                        intent: parseInt(futureIntent.value)
                    }
                };
                
                console.log('Step 0 Data:', userData);
                renderStep1(userData);
            });
        }, 500);
    }

    function renderStep1(userData) {
        appContainer.innerHTML = ''; // Clear previous content
        const step1HTML = `
            <section id="step1-screen" class="fade-in float-up">
                <div class="glass-card p-8 shadow-lg border border-gray-700">
                    <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">Step 1: 관심도 진단</h2>
                    <p class="text-lg text-gray-400 mb-6 text-center">생성형 AI에 대한 당신의 관심 정도를 알려주세요 (1점: 전혀 그렇지 않다, 5점: 매우 그렇다).</p>
                    <div class="space-y-6">
                        ${interestQuestions.map((question, index) => `
                            <div class="question-item p-3 bg-gray-800/50 rounded-lg">
                                <label class="text-md text-gray-300 font-semibold mb-2">${index + 1}. ${question}</label>
                                <div class="flex flex-wrap justify-around pt-2">
                                    ${[1, 2, 3, 4, 5].map(score => `
                                        <label class="flex items-center space-x-1 m-1">
                                            <input type="radio" name="q${index + 1}" value="${score}" class="form-radio h-5 w-5 text-blue-400">
                                            <span>${score}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                        <button id="next-step2-btn" class="w-full mt-8 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                            다음 단계로 <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </section>
        `;
        appContainer.innerHTML = step1HTML;

        document.getElementById('next-step2-btn').addEventListener('click', () => {
            const interestScores = {};
            let allAnswered = true;
            interestQuestions.forEach((_, index) => {
                const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
                if (!selected) {
                    allAnswered = false;
                    return;
                }
                interestScores[`q${index + 1}`] = parseInt(selected.value);
            });

            if (!allAnswered) {
                alert('모든 질문에 응답해주세요.');
                return;
            }

            const totalInterestScore = Object.values(interestScores).reduce((sum, score) => sum + score, 0);
            const averageInterestScore = (totalInterestScore / interestQuestions.length).toFixed(1);

            const updatedUserData = {
                ...userData,
                interestScores: interestScores,
                averageInterestScore: parseFloat(averageInterestScore)
            };

            console.log('Step 1 Data:', updatedUserData);
            renderStep2(updatedUserData);
        });
    }

    function renderStep2(userData) {
        appContainer.innerHTML = ''; // Clear previous content
        const step2HTML = `
            <section id="step2-screen" class="fade-in float-up">
                <div class="glass-card p-8 shadow-lg border border-gray-700">
                    <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">Step 2: 활용도 진단</h2>
                    <p class="text-lg text-gray-400 mb-6 text-center">생성형 AI의 실제 활용 수준을 알려주세요 (1점: 전혀 그렇지 않다, 5점: 매우 그렇다).</p>
                    <div class="space-y-6">
                        ${usageQuestions.map((question, index) => `
                            <div class="question-item p-3 bg-gray-800/50 rounded-lg">
                                <label class="text-md text-gray-300 font-semibold mb-2">${index + 1}. ${question}</label>
                                <div class="flex flex-wrap justify-around pt-2">
                                    ${[1, 2, 3, 4, 5].map(score => `
                                        <label class="flex items-center space-x-1 m-1">
                                            <input type="radio" name="usage_q${index + 1}" value="${score}" class="form-radio h-5 w-5 text-blue-400">
                                            <span>${score}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                        <button id="show-result-btn" class="w-full mt-8 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                            결과 확인하기 <i class="fas fa-check-circle ml-2"></i>
                        </button>
                    </div>
                </div>
            </section>
        `;
        appContainer.innerHTML = step2HTML;

        document.getElementById('show-result-btn').addEventListener('click', () => {
            const usageScores = {};
            let allAnswered = true;
            usageQuestions.forEach((_, index) => {
                const selected = document.querySelector(`input[name="usage_q${index + 1}"]:checked`);
                if (!selected) {
                    allAnswered = false;
                    return;
                }
                usageScores[`usage_q${index + 1}`] = parseInt(selected.value);
            });

            if (!allAnswered) {
                alert('모든 질문에 응답해주세요.');
                return;
            }

            const totalUsageScore = Object.values(usageScores).reduce((sum, score) => sum + score, 0);
            const averageUsageScore = (totalUsageScore / usageQuestions.length).toFixed(1);

            const updatedUserData = {
                ...userData,
                usageScores: usageScores,
                averageUsageScore: parseFloat(averageUsageScore)
            };

            console.log('Step 2 Data:', updatedUserData);
            renderResultScreen(updatedUserData);
        });
    }

    async function renderResultScreen(userData) {
        appContainer.innerHTML = ''; // Clear previous content

        // Calculate Passion Density (C-indicator)
        const passionSum = userData.passionScores.tools + userData.passionScores.paid + userData.passionScores.intent;
        const passionDensity = (passionSum / 3).toFixed(1); // Scale 1.0 to 5.0

        // Determine Quadrant Archetype
        const centerX = 3.0; // PRD에서 정의된 중심값
        const centerY = 3.0; // PRD에서 정의된 중심값

        let persona = '';
        let personaDescription = '';
        let personaColor = ''; // Base color for persona card and dot
        let personaChartBackgroundColor = ''; // More transparent for chart quadrants

        if (userData.averageInterestScore >= centerX && userData.averageUsageScore >= centerY) {
            persona = 'AI 전문가';
            personaDescription = '관심과 실력을 겸비한 전문가';
            personaColor = '#63b3ed'; // Tailwind blue-300
            personaChartBackgroundColor = 'rgba(99, 179, 237, 0.15)'; // Increased opacity
        } else if (userData.averageInterestScore >= centerX && userData.averageUsageScore < centerY) {
            persona = 'AI 꿈나무';
            personaDescription = '호기심은 많으나 실전 경험 필요';
            personaColor = '#b794f4'; // Tailwind purple-300
            personaChartBackgroundColor = 'rgba(183, 148, 244, 0.15)'; // Increased opacity
        } else if (userData.averageInterestScore < centerX && userData.averageUsageScore >= centerY) {
            persona = 'AI 재능러';
            personaDescription = '실무엔 강하나 트렌드 관심 부족';
            personaColor = '#68d391'; // Tailwind green-300
            personaChartBackgroundColor = 'rgba(104, 211, 145, 0.15)'; // Increased opacity
        } else {
            persona = 'AI 병아리';
            personaDescription = '이제 막 시작하는 입문자';
            personaColor = '#a0aec0'; // Tailwind gray-400
            personaChartBackgroundColor = 'rgba(160, 174, 192, 0.15)'; // Increased opacity
        }

        // Store user data via API
        const userResultData = {
            sessionCode: userData.sessionCode,
            name: userData.name,
            averageInterestScore: userData.averageInterestScore,
            averageUsageScore: userData.averageUsageScore,
            passionDensity: parseFloat(passionDensity),
            persona: persona,
            personaColor: personaColor
        };
        const submitResponse = await apiCall('SUBMIT_USER_DATA', { sessionCode: userData.sessionCode, userData: userResultData });
        if (!submitResponse.success) {
            alert('결과 저장에 실패했습니다. 세션 코드를 확인해주세요.');
            showWelcomeScreen();
            return;
        }

        const resultHTML = `
            <section id="result-screen" class="fade-in float-up">
                <div class="glass-card p-8 shadow-lg border border-gray-700">
                    <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">진단 결과: ${userData.name}님</h2>
                    
                    <!-- Persona Card -->
                    <div class="persona-card text-center p-6 rounded-lg mb-8" style="background-color: ${personaChartBackgroundColor}; border: 1px solid ${personaColor};">
                        <h3 class="text-3xl font-['Gowun_Batang'] text-gray-100">${persona}</h3>
                        <p class="text-lg text-gray-300 mt-2">${personaDescription}</p>
                    </div>

                    <!-- Chart -->
                    <div class="chart-container relative w-full h-96 mb-8">
                        <canvas id="insightChart"></canvas>
                        <div class="absolute inset-0 flex justify-center items-center pointer-events-none text-gray-400 text-sm">
                            <span class="absolute bottom-2 left-1/2 -translate-x-1/2">관심도 (Interest)</span>
                            <span class="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90">활용도 (Usage)</span>
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="text-center text-lg text-gray-300 space-y-2">
                        <p><strong>세션 코드:</strong> <span class="text-gray-100">${userData.sessionCode}</span></p>
                        <p><strong>관심도 (평균):</strong> <span class="text-gray-100">${userData.averageInterestScore}점</span></p>
                        <p><strong>활용도 (평균):</strong> <span class="text-gray-100">${userData.averageUsageScore}점</span></p>
                        <p><strong>열정의 농도:</strong> <span class="text-gray-100">${passionDensity}점</span></p>
                    </div>

                    <button id="restart-btn" class="w-full mt-8 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                        다시 진단하기 <i class="fas fa-redo ml-2"></i>
                    </button>
                </div>
            </section>
        `;
        appContainer.innerHTML = resultHTML;

        // Render Chart
        const ctx = document.getElementById('insightChart').getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: userData.name,
                    data: [{
                        x: userData.averageInterestScore,
                        y: userData.averageUsageScore
                    }],
                    backgroundColor: personaColor,
                    borderColor: personaColor,
                    borderWidth: 2,
                    pointRadius: 5 + (parseFloat(passionDensity) - 1) * 2, // Map C to radius (1-5 -> 5-13)
                    pointBackgroundColor: personaColor,
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointStyle: 'circle',
                    pointHoverRadius: 8 + (parseFloat(passionDensity) - 1) * 2,
                    pointHitRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                if (context.raw.x !== null) {
                                    return `${label}: 관심도 ${context.raw.x}, 활용도 ${context.raw.y}, 열정 ${passionDensity}`;
                                }
                                return label;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    },
                    quadrantBackground: { // Custom plugin for quadrant background
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: 1,
                        max: 5,
                        title: {
                            display: true,
                            text: '관심도 (Interest)',
                            color: '#e2e8f0', // text-gray-300
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Subtle grid lines
                            borderColor: '#a0aec0' // text-gray-400
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#e2e8f0' // text-gray-300
                        }
                    },
                    y: {
                        type: 'linear',
                        min: 1,
                        max: 5,
                        title: {
                            display: true,
                            text: '활용도 (Usage)',
                            color: '#e2e8f0', // text-gray-300
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)', // Subtle grid lines
                            borderColor: '#a0aec0' // text-gray-400
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#e2e8f0' // text-gray-300
                        }
                    }
                }
            },
            plugins: [{
                id: 'quadrantBackground',
                beforeDraw: (chart, args, options) => {
                    if (!options.enabled) return;
                    const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
                    ctx.save();

                    const centerX_pixel = x.getPixelForValue(centerX);
                    const centerY_pixel = y.getPixelForValue(centerY);

                    const quadrants = [
                        { name: 'AI 전문가', x: centerX_pixel + (right - centerX_pixel) / 2, y: top + (centerY_pixel - top) / 2, fillStyle: 'rgba(99, 179, 237, 0.15)' }, // Top Right
                        { name: 'AI 꿈나무', x: centerX_pixel + (right - centerX_pixel) / 2, y: centerY_pixel + (bottom - centerY_pixel) / 2, fillStyle: 'rgba(183, 148, 244, 0.15)' }, // Bottom Right
                        { name: 'AI 재능러', x: left + (centerX_pixel - left) / 2, y: top + (centerY_pixel - top) / 2, fillStyle: 'rgba(104, 211, 145, 0.15)' }, // Top Left
                        { name: 'AI 병아리', x: left + (centerX_pixel - left) / 2, y: centerY_pixel + (bottom - centerY_pixel) / 2, fillStyle: 'rgba(160, 174, 192, 0.15)' }  // Bottom Left
                    ];

                    ctx.font = 'bold 16px Gowun Dodum';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    quadrants.forEach(q => {
                        // Draw background
                        ctx.fillStyle = q.fillStyle;
                        if (q.name === 'AI 전문가') ctx.fillRect(centerX_pixel, top, right - centerX_pixel, centerY_pixel - top);
                        else if (q.name === 'AI 꿈나무') ctx.fillRect(centerX_pixel, centerY_pixel, right - centerX_pixel, bottom - centerY_pixel);
                        else if (q.name === 'AI 재능러') ctx.fillRect(left, top, centerX_pixel - left, centerY_pixel - top);
                        else if (q.name === 'AI 병아리') ctx.fillRect(left, centerY_pixel, centerX_pixel - left, bottom - centerY_pixel);
                        
                        // Draw text
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillText(q.name, q.x, q.y);
                    });
                    ctx.restore();
                }
            }]
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            showWelcomeScreen(); // Go back to the welcome screen
        });
    }

    // --- Admin Login ---
    function showAdminLogin() {
        appContainer.innerHTML = ''; // Clear current content
        const adminLoginHTML = `
            <section id="admin-login-screen" class="fade-in float-up text-center">
                <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-gray-100">관리자 로그인</h2>
                <div class="max-w-sm mx-auto">
                    <div class="glass-card p-8 rounded-lg shadow-lg border border-gray-700">
                        <label for="admin-password" class="block text-lg font-medium text-gray-300 mb-4">비밀번호를 입력하세요 (PW: 1234)</label>
                        <input type="password" id="admin-password" class="w-full px-4 py-3 text-2xl text-center tracking-widest border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400 bg-gray-900 text-gray-100" maxlength="4">
                        <button id="admin-login-btn-submit" class="w-full mt-6 watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                            로그인
                        </button>
                        <button id="admin-back-btn" class="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
                            뒤로가기
                        </button>
                    </div>
                </div>
            </section>
        `;
        appContainer.innerHTML = adminLoginHTML;

        document.getElementById('admin-login-btn-submit').addEventListener('click', () => {
            const password = document.getElementById('admin-password').value;
            if (password === '1234') { // Hardcoded password as per PRD
                console.log('관리자 로그인 성공');
                renderAdminDashboard();
            } else {
                alert('비밀번호가 틀렸습니다.');
            }
        });

        document.getElementById('admin-back-btn').addEventListener('click', () => {
            showWelcomeScreen();
        });
    }

    // --- Admin Dashboard ---
    async function renderAdminDashboard() {
        const sessionsResponse = await apiCall('GET_ALL_SESSIONS');
        if (sessionsResponse.success) {
            allSessions = sessionsResponse.sessions; // Update local allSessions with data from backend
        } else {
            console.error("Failed to fetch sessions:", sessionsResponse.message);
            allSessions = []; // Fallback
        }

        appContainer.innerHTML = ''; // Clear current content
        const adminDashboardHTML = `
            <section id="admin-dashboard-screen" class="fade-in float-up">
                <div class="glass-card p-8 shadow-lg border border-gray-700">
                    <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">관리자 대시보드</h2>
                    <p class="text-lg text-gray-300 text-center mb-8">세션 관리 및 결과 모니터링</p>
                    
                    <div class="space-y-4">
                        <button id="create-session-btn" class="w-full watercolor-btn text-white font-bold py-3 px-6 rounded-lg">
                            새로운 세션 생성
                        </button>
                        <div class="p-4 bg-gray-800/50 rounded-lg">
                            <h3 class="text-xl font-['Gowun_Batang'] mb-4 text-gray-100">활성화된 세션</h3>
                            <ul id="active-sessions-list" class="space-y-2 text-gray-300">
                                <!-- Sessions will be loaded here -->
                            </ul>
                        </div>
                        <button id="admin-dashboard-back-btn" class="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
                            뒤로가기
                        </button>
                    </div>
                </div>
            </section>
        `;
        appContainer.innerHTML = adminDashboardHTML;

        // Populate active sessions list
        const activeSessionsList = document.getElementById('active-sessions-list');
        if (allSessions.length === 0) {
            activeSessionsList.innerHTML = `<li class="text-center text-gray-500">생성된 세션이 없습니다.</li>`;
        } else {
            activeSessionsList.innerHTML = allSessions.map(session => `
                <li class="flex justify-between items-center p-2 bg-gray-900 rounded-lg">
                    <span>세션 코드: <strong class="text-gray-100">${session.code}</strong> (${session.users.length}명 참여)</span>
                    <div>
                        <button class="view-session-btn text-blue-400 hover:underline mr-2" data-session-code="${session.code}">결과 보기</button>
                        <button class="delete-session-btn text-red-400 hover:underline" data-session-code="${session.code}">삭제</button>
                    </div>
                </li>
            `).join('');
        }

        document.getElementById('create-session-btn').addEventListener('click', createNewSession);
        document.querySelectorAll('.view-session-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sessionCodeToView = e.target.dataset.sessionCode;
                viewSessionResults(sessionCodeToView);
            });
        });
        document.querySelectorAll('.delete-session-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sessionCodeToDelete = e.target.dataset.sessionCode;
                if (confirm(`정말로 세션 ${sessionCodeToDelete}를 삭제하시겠습니까?`)) {
                    deleteSession(sessionCodeToDelete);
                }
            });
        });
        document.getElementById('admin-dashboard-back-btn').addEventListener('click', () => {
            showAdminLogin();
        });
    }

    async function createNewSession() {
        const response = await apiCall('CREATE_SESSION');
        if (response.success) {
            alert(`새로운 세션이 생성되었습니다: ${response.sessionCode}`);
            renderAdminDashboard(); // Refresh dashboard
        } else {
            alert('세션 생성에 실패했습니다: ' + response.message);
        }
    }

    async function deleteSession(sessionCode) {
        const response = await apiCall('DELETE_SESSION', { sessionCode });
        if (response.success) {
            alert(`세션 ${sessionCode}가 삭제되었습니다.`);
            renderAdminDashboard(); // Refresh dashboard
        } else {
            alert('세션 삭제에 실패했습니다: ' + response.message);
        }
    }

    async function viewSessionResults(sessionCode) {
        const response = await apiCall('GET_SESSION_DETAILS', { sessionCode });
        if (!response.success || !response.session) {
            alert('세션을 찾을 수 없거나 데이터를 불러오지 못했습니다.');
            renderAdminDashboard();
            return;
        }
        const session = response.session;

        appContainer.innerHTML = ''; // Clear current content
        const sessionResultHTML = `
            <section id="session-result-screen" class="fade-in float-up">
                <div class="glass-card p-8 shadow-lg border border-gray-700">
                    <h2 class="text-2xl font-['Gowun_Batang'] mb-6 text-center text-gray-100">세션 결과: ${sessionCode}</h2>
                    <p class="text-lg text-gray-300 text-center mb-8">${session.users.length}명 참여</p>
                    
                    <!-- Chart for multiple users -->
                    <div class="chart-container relative w-full h-96 mb-8">
                        <canvas id="sessionInsightChart"></canvas>
                        <div class="absolute inset-0 flex justify-center items-center pointer-events-none text-gray-400 text-sm">
                            <span class="absolute bottom-2 left-1/2 -translate-x-1/2">관심도 (Interest)</span>
                            <span class="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90">활용도 (Usage)</span>
                        </div>
                    </div>

                    <!-- User List -->
                    <div class="space-y-4">
                        <h3 class="text-xl font-['Gowun_Batang'] mb-4 text-gray-100">참여자 목록</h3>
                        <ul id="session-users-list" class="space-y-2 text-gray-300">
                            ${session.users.length === 0 ? 
                                `<li class="text-center text-gray-500">이 세션에 참여한 사용자가 없습니다.</li>` :
                                session.users.map(user => `
                                <li class="flex justify-between items-center p-2 bg-gray-900 rounded-lg">
                                    <span><strong class="text-gray-100">${user.name}</strong> (${user.persona})</span>
                                    <span style="color: ${user.personaColor};">X=${user.averageInterestScore}, Y=${user.averageUsageScore}, C=${user.passionDensity}</span>
                                </li>
                                `).join('')
                            }
                        </ul>
                    </div>

                    <button id="back-to-dashboard-btn" class="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
                        대시보드로 돌아가기
                    </button>
                </div>
            </section>
        `;
        appContainer.innerHTML = sessionResultHTML;

        // Render Chart for multiple users
        const ctx = document.getElementById('sessionInsightChart').getContext('2d');
        
        const datasets = session.users.map(user => {
            return {
                label: user.name,
                data: [{
                    x: user.averageInterestScore,
                    y: user.averageUsageScore
                }],
                backgroundColor: user.personaColor,
                borderColor: user.personaColor,
                borderWidth: 2,
                pointRadius: 5 + (user.passionDensity - 1) * 2,
                pointBackgroundColor: user.personaColor,
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointStyle: 'circle',
                pointHoverRadius: 8 + (user.passionDensity - 1) * 2,
                pointHitRadius: 10
            };
        });

        // Determine Quadrant Archetype (for chart background)
        const centerX = 3.0;
        const centerY = 3.0;

        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true, // Display legend for multiple users
                        labels: {
                            color: '#e2e8f0' // text-gray-300
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const user = session.users[context.datasetIndex];
                                return `${user.name} (${user.persona}): 관심도 ${user.averageInterestScore}, 활용도 ${user.averageUsageScore}, 열정 ${user.passionDensity}`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    },
                    quadrantBackground: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        min: 1,
                        max: 5,
                        title: {
                            display: true,
                            text: '관심도 (Interest)',
                            color: '#e2e8f0',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#a0aec0'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#e2e8f0'
                        }
                    },
                    y: {
                        type: 'linear',
                        min: 1,
                        max: 5,
                        title: {
                            display: true,
                            text: '활용도 (Usage)',
                            color: '#e2e8f0',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#a0aec0'
                        },
                        ticks: {
                            stepSize: 1,
                            color: '#e2e8f0'
                        }
                    }
                }
            },
            plugins: [{
                id: 'quadrantBackground',
                beforeDraw: (chart, args, options) => {
                    if (!options.enabled) return;
                    const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
                    ctx.save();

                    const centerX_pixel = x.getPixelForValue(centerX);
                    const centerY_pixel = y.getPixelForValue(centerY);

                    const quadrants = [
                        { name: 'AI 전문가', x: centerX_pixel + (right - centerX_pixel) / 2, y: top + (centerY_pixel - top) / 2, fillStyle: 'rgba(99, 179, 237, 0.15)' }, // Top Right
                        { name: 'AI 꿈나무', x: centerX_pixel + (right - centerX_pixel) / 2, y: centerY_pixel + (bottom - centerY_pixel) / 2, fillStyle: 'rgba(183, 148, 244, 0.15)' }, // Bottom Right
                        { name: 'AI 재능러', x: left + (centerX_pixel - left) / 2, y: top + (centerY_pixel - top) / 2, fillStyle: 'rgba(104, 211, 145, 0.15)' }, // Top Left
                        { name: 'AI 병아리', x: left + (centerX_pixel - left) / 2, y: centerY_pixel + (bottom - centerY_pixel) / 2, fillStyle: 'rgba(160, 174, 192, 0.15)' }  // Bottom Left
                    ];

                    ctx.font = 'bold 16px Gowun Dodum';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    quadrants.forEach(q => {
                        // Draw background
                        ctx.fillStyle = q.fillStyle;
                        if (q.name === 'AI 전문가') ctx.fillRect(centerX_pixel, top, right - centerX_pixel, centerY_pixel - top);
                        else if (q.name === 'AI 꿈나무') ctx.fillRect(centerX_pixel, centerY_pixel, right - centerX_pixel, bottom - centerY_pixel);
                        else if (q.name === 'AI 재능러') ctx.fillRect(left, top, centerX_pixel - left, centerY_pixel - top);
                        else if (q.name === 'AI 병아리') ctx.fillRect(left, centerY_pixel, centerX_pixel - left, bottom - centerY_pixel);
                        
                        // Draw text
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillText(q.name, q.x, q.y);
                    });
                    ctx.restore();
                }
            }]
        });


        document.getElementById('back-to-dashboard-btn').addEventListener('click', () => {
            renderAdminDashboard();
        });
    }


    // --- Helper to inject styles ---
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .fade-out {
                animation: fadeOut 0.5s ease-in-out forwards;
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            .form-radio {
                transition: all 0.2s ease-in-out;
            }
            .form-radio:focus {
                --tw-ring-color: #63b3ed; /* Tailwind blue-300 */
                --tw-ring-offset-color: #1a202c; /* Background color */
            }
            .chart-container {
                position: relative;
                height: 400px;
                width: 100%;
            }
            /* Adjust question-item padding for better mobile spacing */
            .question-item .flex.flex-wrap > label {
                margin: 0.25rem; /* Added margin for radio buttons */
            }
            .chartjs-render-monitor {
                background: transparent; /* Ensure canvas background is transparent */
            }
        `;
        document.head.appendChild(style);
    }

    addDynamicStyles();
});
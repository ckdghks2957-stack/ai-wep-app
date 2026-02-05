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

    // --- Initial Render ---
    showWelcomeScreen();

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

    function handleStart() {
        const sessionCodeInput = document.getElementById('session-code');
        const sessionCode = sessionCodeInput.value.trim();
        if (sessionCode.length === 4 && !isNaN(sessionCode)) {
            console.log(`세션 코드 ${sessionCode}으로 진단을 시작합니다.`);
            renderStep0(sessionCode);
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

    function renderResultScreen(userData) {
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
                },
                // Request 3: Quadrant coloring in chart background is handled by plugin
            },
            plugins: [{
                id: 'quadrantBackground',
                beforeDraw: (chart, args, options) => {
                    if (!options.enabled) return;
                    const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
                    ctx.save();

                    const centerX_pixel = x.getPixelForValue(centerX);
                    const centerY_pixel = y.getPixelForValue(centerY);

                    // AI 전문가 (Top Right)
                    ctx.fillStyle = 'rgba(99, 179, 237, 0.15)'; // Light transparent blue
                    ctx.fillRect(centerX_pixel, top, right - centerX_pixel, centerY_pixel - top);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 16px Gowun Dodum';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillText('AI 전문가', centerX_pixel + (right - centerX_pixel) / 2, top + (centerY_pixel - top) / 2);

                    // AI 꿈나무 (Bottom Right)
                    ctx.fillStyle = 'rgba(183, 148, 244, 0.15)'; // Light transparent purple
                    ctx.fillRect(centerX_pixel, centerY_pixel, right - centerX_pixel, bottom - centerY_pixel);
                    ctx.fillText('AI 꿈나무', centerX_pixel + (right - centerX_pixel) / 2, centerY_pixel + (bottom - centerY_pixel) / 2);

                    // AI 재능러 (Top Left)
                    ctx.fillStyle = 'rgba(104, 211, 145, 0.15)'; // Light transparent green
                    ctx.fillRect(left, top, centerX_pixel - left, centerY_pixel - top);
                    ctx.fillText('AI 재능러', left + (centerX_pixel - left) / 2, top + (centerY_pixel - top) / 2);

                    // AI 병아리 (Bottom Left)
                    ctx.fillStyle = 'rgba(160, 174, 192, 0.15)'; // Light transparent gray
                    ctx.fillRect(left, centerY_pixel, centerX_pixel - left, bottom - centerY_pixel);
                    ctx.fillText('AI 병아리', left + (centerX_pixel - left) / 2, centerY_pixel + (bottom - centerY_pixel) / 2);

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

    // --- Admin Dashboard (Placeholder for now) ---
    function renderAdminDashboard() {
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
                                <li class="text-center text-gray-500">생성된 세션이 없습니다.</li>
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

        document.getElementById('admin-dashboard-back-btn').addEventListener('click', () => {
            showAdminLogin();
        });

        // TODO: Implement actual session management and monitoring (requires backend)
        console.log('관리자 대시보드 렌더링. 세션 관리 및 결과 모니터링 기능은 백엔드 필요.');
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
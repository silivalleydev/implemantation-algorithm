const prompt = require("prompt");
prompt.start();
/**
 * 게임 개발
 * 
 * 현민이는 게임 캐릭터가 맵 안에서 움직이는 시스템을 개발 중이다.
 * 캐릭터가 있는 장소는 1 * 1 크기의 정사각형으로 이뤄진 N * M 크기의 직사각형으로,
 * 각각의 칸은 육지 또는 바다이다.
 * 캐릭터는 동서남북 중 한곳을 바라본다.
 * 
 * 맵의 각 칸은 (A, B)로 나타낼 수 있고, A는 북쪽으로부터 떨어진 칸의 개수,
 * B는 서쪽으로부터 떨어진 칸의 개수이다.
 * 
 * 캐릭터는 상하좌우로 움직일 수 있고, 바다로 되어 있는 공간에는 갈 수 없다.
 * 캐릭터의 움직임을 설정하기 위해 정해 놓은 메뉴얼은 이러하다.
 * 
 * 1. 현재 위치에서 현재 방향을 기준으로 왼쪽 방향(반시계 방향으로 90도 회전한 방향)부터 차례대로 갈 곳을 정한다.
 * 2. 캐릭터의 바로 왼쪽 방향에 아직 가보지 않은 칸이 존재한다면,
 * 왼쪽 방향으로 회전한 다음 왼쪽으로 한칸을 전진한다.
 * 왼쪽 방향에 가보지 않은 칸이 없다면 왼쪽 방향으로 회전만 수행하고 1단계로 돌아간다.
 * 3. 만약 네방향 모두 이미 기본 칸 이거나 바다로 되어있는 칸인 경우에는 바라보는 방향을 유지한채로 
 * 한칸 뒤로가고 1단계로 돌아간다. 단, 이때 뒤쪽 방향이 바다인 칸이라 뒤로 갈 수 없는 경우에는 움직임을 멈춘다.
 * 
 * 현민이는 위 과정을 반복적으로 수행하면서 캐릭터의 움직임에 이상이 있는지 테스트하려고 한다.
 * 메뉴얼에 따라 캐릭터를 이동시킨 뒤에, 캐릭터가 방문한 칸의 수를 출력하는 프로그램을 만드시오.
 * 
 * - 첫째 줄에 맵의 세로 크기 N과 가로 크기 M을 공백으로 구분하여 입력한다.
 * - 둘째 줄에 게임 캐릭터가 있는 칸의 좌표(A, B)와 바라보는 방향 d가 각각 서로 공백을 구분하여 주어진다.
 * 방향 d의 값으로는 다음과 같이 4가지가 존재한다.
 *      - 0: 북쪽
 *      - 1: 동쪽
 *      - 2: 남쪽
 *      - 3: 서쪽
 * - 셋째 줄부터 맵이 육지인지 바다인지에 대한 정보가 주어진다.
 * N개의 줄에 맵의 상태가 북쪽부터 남쪽 순서대로,
 * 각 줄의 데이터는 서쪽부터 동쪽 순서대로 주어진다.
 * 맵의 외곽은 항상 바다로 되어있다.
 *      - 0: 육지
 *      - 1: 바다
 * - 처음에 게임 캐릭터가 위치한 칸의 상태는 항상 육지이다.
 * 
 * 첫 줄에 이동을 마친 후 캐릭터가 방문한 칸의 수를 출력하시오.
 * 
 * 첫째 입력: 4 4
 * 두번쨰 입력: 1 1 0
 * 세번쨰 입력: 1 1 1 1
 * 네번쨰 입력: 1 0 0 1
 * 다섯번쨰 입력: 1 1 0 1
 * 여섯번쨰 입력: 1 1 1 1
 * 
 */
prompt.get(["rowNcol", "userPosition"], function(err, firstRes){
    const { rowNcol, userPosition } = firstRes;
    let answer = 0;

    function spaceStrToArray (str) {
        return str.split(" ");
    }

    const rowNcolArray = spaceStrToArray(rowNcol);
    const userPositionArr = spaceStrToArray(userPosition).map(n => Number(n));

    const promptRows = [];
    for (let i = 0; i < Number(rowNcolArray[0]); i++) {
        promptRows.push(`row${i + 1}`);
    }

    // 0 북 / 1 동 / 2 남 / 3 서
    const direction = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    prompt.get(promptRows, function(err, res){
        let map = [];
        Object.keys(res).forEach(key => {
            map.push(spaceStrToArray(res[key]).map(n => Number(n)));
        });

        const check = [[userPositionArr[0], userPositionArr[1]]];
        let turnCount = 0;

        // 캐릭터의 방향 전환시키는 함수
        function turnDirection() {
            console.log('turn')
            // 현재방향 -1의 값이 0보다 작은 경우는 방향 배열의 마지막 인덱스로 보낸다.
            if (userPositionArr[2] - 1 < 0) {
                userPositionArr[2] = 3;
            } else {
                // 아닌 경우 현재 방향에서 -1 한다
                userPositionArr[2] -= 1;
            }
            console.log('direction =>', userPositionArr[2]);
            // 돌아서 체크한것 카운트
            turnCount++;
        }
        while (true) {
            // 반시계방향쪽 방향
            const checkDirection = ((userPositionArr[2] - 1) < 0 ? 3 : (userPositionArr[2] - 1));
            // 해당 방향으로 이동했을시 x y 좌표
            const yCoor = userPositionArr[1] + direction[checkDirection][1];
            const xCoor = userPositionArr[0] + direction[checkDirection][0];

            //map[yCoor][xCoor]

            // 4번 방향 전환을 한경우 (4방향 모두 못가는경우)
            if (turnCount === 4) {

                // 현재 캐릭터가 보는 방향 기준 뒤쪽 한칸 포지션 구함
                const backStepPosition = (userPositionArr[2] - 2) === -1 ? 3 : (userPositionArr[2] - 2) === -2 ? 2 : (userPositionArr[2] - 2);
                // 뒤로 한칸의 xy값 구함
                const backYCoor = userPositionArr[1] + direction[backStepPosition][1];
                const backXCoor = userPositionArr[0] + direction[backStepPosition][0];

                // 만약 뒤로 간 방향의 값이 1(바다)인 경우 움직이는 것 종료
                if (map[backYCoor][backXCoor] === 1) {
                    console.log('is 1');
                    break;
                } else {
                    // 뒤로간 방향의 값이 0(육지인 경우) 이동했으니
                    console.log('is else');

                    // x y 값 저장하고
                    userPositionArr[0] = backXCoor;
                    userPositionArr[1] = backYCoor;
                    // 이동한 것 카운트하고
                    answer++;
                    // 돌았던 횟수 초기화하고
                    turnCount = 0;
                    continue;
                }
            }

            // 이동한 방향의 x y 값이 양수인경우
            if (yCoor >= 0 && xCoor >= 0) {
                // 해당 좌표의 값이 1(바다)인 경우
                if (map[yCoor][xCoor] === 1) {
                    // 방향을 돌린다.
                    turnDirection();
                } else {
                    // map[yCoor][xCoor] === 0(육지) 인 경우
                    // 한번 갔었던 육지인지 확인
                    const isChecked = check.filter(coor => yCoor === coor?.[1] && xCoor === coor?.[0]);
                    console.log('isChecked', yCoor, xCoor, isChecked, check)

                    // 갔었던 육지가 아닌 경우 이동
                    if (isChecked.length === 0) {
                        // x y 좌표를 저장
                        userPositionArr[0] = xCoor;
                        userPositionArr[1] = yCoor;
                        // 한번 이동한것 카운트
                        answer++;

                        // 몇번 돌았는지 카운트하는것 초기화
                        turnCount = 0;

                        // 육지 중 체크된 육지로 넣어줌
                        check.push([xCoor, yCoor]);

                        // 이동했기 떄문에 캐릭터가 바라보는 방향 변경
                        console.log('go', checkDirection)
                        userPositionArr[2] = checkDirection;
                    } else {
                        // 갔었던 육지인 경우 한바퀴 돈다.
                        turnDirection();
                    }
                }
            } else {
                // 이동한 방향의 x y 값 중 하나라도 음수인경우
                // 방향 전환한다.
                turnDirection();
            }
        }
        console.log('map???', map);

        console.log('answer???', answer)
    });
});

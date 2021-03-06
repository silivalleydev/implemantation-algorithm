const prompt = require("prompt");
prompt.start();
/**
 * 상하좌우
 * 
 * 여행가 A는 N * N 크기의 정사각형 공간위에 서있다.
 * 이 공간은 1 * 1 크기의 정사각형으로 나누어져있다.
 * 
 * 가장 왼쪽 위 좌표는 (1,1)이며, 가장 오른쪽 아래 좌표는 (N,N)에 해당한다.
 * 
 * 여행가 A는 상, 하, 좌, 우 방향으로 이동할 수 있으며, 시작 좌표는 항상 (1,1)이다.
 * 우리 앞에는 여행가 A가 이동할 계획이 적인 계획서가 놓여있다.
 * 
 * 계획서에는 하나의 줄에 띄어쓰기를 기준으로 하여 L, R, U, D 중 하나의 문자가 반복적으로 적혀있다.
 * 각 문자의 의미는 아래와 같다.
 * 
 * - L: 왼쪽으로 한 칸 이동
 * - R: 오른쪽으로 한 칸 이동
 * - U: 위로 한 칸 이동
 * - D: 아래로 한 칸 이동
 * 
 * 이때 여행가 A가 N * N 크기의 정사각형 공간을 벗어나는 움직임은 무시된다.
 * 예를들어 (1,1)의 위치에서 L 혹은 U를 만나면 무시된다.
 * 
 * - 첫째 줄에 공간의 크기를 나타내는 N이 주어진다.
 * - 둘째 줄에 여행가 A가 이동할 계획서 내용이 주어진다.
 * - 첫째 중에 여행가 A가 최종적으로 도착할 지점의 좌표 (X,Y)를 공백으로 ㅊ구분하여 출력한다.
 * 
 * 첫번쨰 입력 5
 * 두번째 입력 R R R U D D
 * 
 * 정답 4 3
 * 
 */
prompt.get(["space", "plan"], function(err, firstRes){
    const { space, plan } = firstRes;
    function spaceStrToArray (str) {
        return str.split(" ");
    }

    const spaceNumber = Number(space);
    const planArr = spaceStrToArray(plan);
    const xy = [1, 1];

    // 계획서 내용만큼 순회한다.
    planArr.forEach(plan => {
        // x값을 먼저 뺀다
        let x = xy[0];
        // y값을 먼저 뺀다
        let y = xy[1];
        switch (plan) {
            case 'L':
                // 왼쪽이면 x 좌표 -1
                x -= 1;
                break;
            case 'R':
                // 오른쪽이면 x 좌표 +1
                x += 1;
                break;
            case 'U':
                // 윗쪽이면 y 좌표 -1
                y -= 1;
                break;
            case 'D':
                // 아랫쪽이면 y 좌표 +1
                y += 1;
                break;

            }

            // x와 y가 1보다 작거나 정사각형 공간 보다 크면 무시한다.
            if (x < 1 || y < 1 || x > spaceNumber || y > spaceNumber) return;

            // 위의 조건에 해당하지 않으면 switch문에서 계산한 x와 y값을 넣어준다.
            xy[0] = x;
            xy[1] = y;
    });

    console.log('coordinate', xy)
});

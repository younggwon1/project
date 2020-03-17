# Javascript 실습2

> 1. 작업할 목록을 입력하면, 입력필드 하단에 지금까지 입력된 결과를 출력
> 2. 전체 작업 목록은 각 항목마다 삭제버튼을 클릭하면 해당 항목을 삭제 



```js
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <style>
        .item {
            display: inline-block;
            overflow: hidden;
            width: 120px;
        }

        .red {
            color: red;
        }

        .blue {
            color: blue;
        }
    </style>
    <!-- 차트 링크 -->
    <script src="./mydate.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <script src="./mydate.js"></script>
    <script>
        $(document).ready(function () {


            
            $('#btnsubmit').on('click', function () {
                $('#contents').empty();
                let start = $('#start').val();
                console.log(start)
                start = Date.parse(start) / 1000;
                console.log(start)

                let end = $('#end').val();
                console.log(end)
                end = Date.parse(end) / 1000;
                console.log(end)


                // retrieve 'bitcoin data' from poloniex.com
                let dateArray = [];
                let highArray = [];
                let lowArray = [];

                $.ajax({
                    url: "https://poloniex.com/public",
                    type: "GET",
                    data: {
                        'command': 'returnChartData',
                        'currencyPair': 'USDT_BTC',
                        'start': start,
                        'end': end,
                        'period': '86400'
                    },
                    success: function (data) {
                        $.each(data, function (index, item) {
                            let date = convertDate(item.date);
                            let high = item.high;
                            let low = item.low;
                            let volume = item.volume;

                            dateArray.push(date);
                            highArray.push(high);
                            lowArray.push(low);

                            let div = document.createElement("div");
                            let html = "";
                            html += "<span class='item'>" + date + "</span>";
                            html += "<span class='item red'>" + high + "</span>";
                            html += "<span class='item blue'>" + low + "</span>";
                            html += "<span class='item'>" + volume + "</span>";
                            div.innerHTML = html;

                            $("#contents").append(div);
                        });
                        let ctx = document.getElementById('myChart').getContext('2d');
                        let chart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: dateArray,
                                datasets: [{
                                    label: 'High price',
                                    backgroundColor: 'transparent',
                                    borderColor: 'red',
                                    data: highArray
                                },
                                {
                                    label: 'Low price',
                                    backgroundColor: 'transparent',
                                    borderColor: 'blue',
                                    data: lowArray
                                }]
                            },
                            options: {
                                legend: {
                                    display: false
                                }
                            }
                        });
                    },
                    error: function (err) {
                        alert(err);
                    }
                });


            });
        });
    </script>
</head>

<body>
    <div class="container">
        <canvas id="myChart"></canvas>
    </div>


    <input type="start" name="start" id="start" placeholder="시작일을 입력하세요">
    <input type="end" name="end" id="end" placeholder="종료일을 입력하세요">
    <!--<input type="button" id="btnsubmit" value="검색">--> 
    <button id="btnsubmit">검색</button>
    
    <div id="contents"></div>
</body>
</html>
```


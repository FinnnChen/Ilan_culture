//宣告全域變數
var app;
var map;
var jsonData = [];
var filerData = [];
        
//取得宜蘭文化景觀JSON
var xhr = new XMLHttpRequest();
xhr.open('get','js/Ilan.json',true);
xhr.send(null);

//取得資料後開始編成
xhr.onload = function(){
    jsonData = JSON.parse(xhr.response);
    var len = jsonData.length;

	//初始的filer放入第一頁資料
	function enterFilerData(){
		for (var i = 0; i < len; i++){
			filerData.push(jsonData[i]);
		};
	};
	enterFilerData()
	
	//為資料插入自定義ID序號
	function countIdNum(){
		for (var i = 0; i < len; i++){
			jsonData[i].idNum = i
		};
	};
	countIdNum();
    
	app = new Vue({
		el: '#app',
		data: {
			database : jsonData,
			filer: filerData,
			areas: [ '宜蘭市', '羅東鎮', '五結鄉', '員山鄉', '頭城鎮'],
            title : "所有",
            thisValue : ''
		},
		//methods搭配v-on做監聽反應
		methods:{
                // 選單切換資料方式
                changeContentBySelector: function(thisValue){
                    this.filer = [];
                    this.title = thisValue;
                    for (var i = 0; i < len; i++){
                        if (thisValue == jsonData[i].AREA){
                            this.filer.push(jsonData[i]);
                        };
                    };
                    filerData = this.filer;
                    initMap()
                },
			},
		//邏輯運算即時更動數據
		computed:{}, 
	});
    
	// Google Map API 設定
	function initMap(){
		map = new google.maps.Map(document.getElementById('google-map'), {
			center: {lat: 24.7679377, lng: 121.7971042},
			zoom: 11,
		  });
		for (var i = 0;i < filerData.length;i++){
			var marker = new google.maps.Marker({
				position : {lat: parseFloat(filerData[i].LAT),lng: parseFloat(filerData[i].LNG)},
				map: map,
				title : filerData[i].TITLE
			});
		}
	};
	initMap();
}
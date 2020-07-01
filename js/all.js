// 個人資訊
var uuid = '8997512c-2d60-40a2-b4a3-5240bcc586d0';
var apiPath = 'https://course-ec-api.hexschool.io/';

// dom
var app = document.getElementById('app');

// 宣告一個物件裝所有資料
var obj = {
    data: {
        uuid, // 物件縮寫: 物件名稱與屬性名稱相同時，可以寫一次即可。
        products: [], // 空陣列裝回傳的商品資料
    },

    // 前台 取資料 GET api/{uuid}/ec/products    
    gatData: function() {
        var vm = this; // 這裡的 this 指的是 obj 
        var url = `${apiPath}api/${uuid}/ec/products`; // 站點 / API 路徑 / uuid
        
        // 向遠端伺服器發送請求 讀取資料
        axios.get(url)  
            .then(function(res){
                console.log(res.data.data); // 確認有回傳資料
                vm.data.products = res.data.data; // 將回傳的資料塞到空[]裡                
                vm.render(); // 取得資料後 渲染畫面
            })
            .catch(function (err) { // 讀取失敗 就會跳到 catch
                console.log('讀取失敗', err);
            });
    },
    // 渲染畫面 
    render: function() {
        var vm = this;  // 這裡的 this 指的是 obj
        var products = vm.data.products;  // 目前空陣列已裝好回傳的資料
        var str = '';
        products.forEach(function (item) {  
            str +=
            `<div class="col col-md-6 mb-5">
                <div class="card border-0 bg-transparent text-white">
                    <div class="img-wrap">
                        <img src="${ item.imageUrl[0] }" class="card-img-top">
                    </div>
                    <div class="card-body px-0">
                        <h5 class="card-title">${item.title}</h5>
                        <small class="card-text">${item.content}</small>
                        <p class="lineThrough text-right mb-1">原價NT$ ${item.origin_price}</p>
                        <p class="text-right h3 price text-danger"><span class="h5">特價NT$</span> ${item.price}</p>
                        <a href="#" class="btn btn-outline-danger btn-block"><i class="fas fa-shopping-cart mr-2"></i></i>Add to Cart !</a>
                    </div>
                </div>
            </div>`;

        });
        app.innerHTML = str; // 把字串印在HTML上
    }
}
obj.gatData(); // 呼叫物件函式

// 不懂 imageUrl[0] 後面為何要加 [0] ?? 是每次都從第 0 筆開始新增 ??
// 沒有加 [0] 為何也能正常運行 ??
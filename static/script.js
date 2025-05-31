let preview = document.getElementById("preview");
let generate_url = document.createElement("div");
generate_url.id = "generate_url";
generate_url.className = "generate_url";
generate_url.innerText = window.location.protocol + '//' + window.location.host + '/svg';
preview.appendChild(generate_url);

let generate_btn = document.createElement("button");
generate_btn.id = "generate_btn";
generate_btn.className = "generate";
generate_btn.innerHTML = '<span>🎨</span> 生成卡片 / Generate Card';
preview.appendChild(generate_btn);
generate_btn.addEventListener("click", generate);

let copy_url_btn = document.createElement("button")
copy_url_btn.id = "copy_url_btn"
copy_url_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>'
copy_url_btn.title = "复制链接";
copy_url_btn.addEventListener("click", copy_url);
generate_url.appendChild(copy_url_btn)

function copy_url() {
    let url = document.getElementById("generate_url").innerText;
    navigator.clipboard.writeText(url).then(() => {
        copy_url_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
        copy_url_btn.style.background = '#10b981';
        setTimeout(() => {
            copy_url_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>';
            copy_url_btn.style.background = '#667eea';
        }, 2000);
    });
}

function render_card(username, team, skin) {
    const cardPreview = document.getElementsByClassName('card-preview')[0];
    cardPreview.innerHTML = '<div class="loading">🎨 生成中...</div>';
    cardPreview.classList.add('loading');
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/svg?username=' + username + '&team=' + team + '&skin=' + skin, true);
    xhr.onload = function () {
        cardPreview.classList.remove('loading');
        if (xhr.status === 200) {
            let svg = xhr.responseXML.documentElement;
            cardPreview.innerHTML = '';
            cardPreview.appendChild(svg);
        } else {
            cardPreview.innerHTML = '<div style="color: #ef4444;">❌ 生成失败</div>';
        }
    };
    xhr.onerror = function() {
        cardPreview.classList.remove('loading');
        cardPreview.innerHTML = '<div style="color: #ef4444;">❌ 网络错误</div>';
    };
    xhr.send();
}

function render_skin_list() {
    // 显示加载状态
    let fathertree = document.getElementById('inputform');
    let loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: #667eea;">🔄 加载皮肤列表中...</div>';
    loadingDiv.className = 'loading';
    fathertree.appendChild(loadingDiv);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/skinjson", true);
    xhr.responseType = "json";
    xhr.onload = function () {
        if (xhr.status === 200) {
            let skins = xhr.response.skins;
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "/ghskinjson");
            xhr2.responseType = "json";
            xhr2.onload = function () {
                if (xhr2.status === 200) {
                    let skins2 = xhr2.response;
                    skins = skins.concat(skins2);
                    
                    // 移除加载状态
                    fathertree.removeChild(loadingDiv);
                    
                    let table = document.createElement("table");
                    table.id = 'myTable'
                    
                    for (let skin of skins) {
                        let tr = document.createElement("tr");
                        tr.onclick = function () {
                            selectRow(this);
                        };
                        
                        let td1 = document.createElement("td");
                        let canvas = document.createElement("canvas");
                        canvas.width = 96;
                        canvas.height = 64;
                        
                        let img = new Image();
                        switch (skin.type) {
                            case "normal":
                                img.src = "https://ddnet.org/skins/skin/" + skin.name + ".png";
                                break;
                            case "community":
                                img.src = "https://ddnet.org/skins/skin/community/" + skin.name + ".png";
                                break;
                            case "file":
                                img.src = skin.download_url;
                                break;
                        }
                        tr.setAttribute("url", img.src);
                        img.onload = function () {
                            OnTeeSkinRender(canvas, img);
                        };
                        
                        td1.appendChild(canvas);
                        
                        let td2 = document.createElement("td");
                        let text;
                        if (skin.type === "file") {
                            text = document.createTextNode(skin.name.slice(0, -4));
                        } else {
                            text = document.createTextNode(skin.name);
                        }
                        td2.appendChild(text);
                        
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        table.appendChild(tr);
                    }
                    
                    fathertree.appendChild(table);
                    
                    // 搜索功能
                    var input = document.getElementById("searchInput");
                    var rows = table.rows;

                    input.addEventListener("keyup", function() {
                        var keyword = input.value.toUpperCase();
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].cells;
                            if (cells[1].innerHTML.toUpperCase().indexOf(keyword) > -1) {
                                rows[i].style.display = "";
                            } else {
                                rows[i].style.display = "none";
                            }
                        }
                    });
                }
            };
            xhr2.send();
        }
    };
    xhr.send();
}

//定义一个全局变量，用来存储选中的行的数据
var selectedRowData = null;

//定义一个函数，用来选择表格中的一行
function selectRow(row) {
    //获取表格元素
    var table = document.getElementById("myTable");
    //获取表格中所有的行
    var rows = table.rows;
    
    for (var i = 0; i < rows.length; i++) {
        //取消所有已经选择的行的样式和状态
        rows[i].setAttribute("data-selected", "false");
    }
    
    //为当前点击的行添加选中的样式和状态
    row.setAttribute("data-selected", "true");
    //将当前点击的行的数据存储到变量中
    selectedRowData = row.getAttribute("url");
}

render_skin_list()
render_card('nameless tee', '', 'https://ddnet.org/skins/skin/default.png')

function generate() {
    let nickname = document.getElementsByName("nickname")[0].value;
    let team = document.getElementsByName("team")[0].value;
    let skin = selectedRowData;
    
    if (nickname === '') {
        nickname = 'nameless tee';
    }
    if (skin === null) {
        skin = 'https://ddnet.org/skins/skin/default.png';
    }
    
    generate_url.innerText = window.location.protocol + '//' + window.location.host + '/svg?username=' + nickname + '&team=' + team + '&skin=' + skin;
    generate_url.appendChild(copy_url_btn);
    render_card(nickname, team, skin);
}

var clientId = 'eq990vt85o5dquacakpy5u32ofrmmt';
var limit = 20;
var apiUrl = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&limit=' + limit;

// Create XHR Object
var xhr = new XMLHttpRequest();

// OPEN - type, url/file, async
xhr.open('GET', apiUrl, true);

console.log('Ready State: ', xhr.readyState)

// OPTIONAL - used for loaders
xhr.onprogress = function() {
    console.log('Ready State: ', xhr.readyState)
}

xhr.onload = function() {
console.log('Ready State: ', xhr.readyState)
    if (this.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var cols = data.streams;
        var row = document.querySelector('.row');
        var result = '';
        for (var i = 0; i < cols.length; i++) { // 將內容先處理好
            result += `
            <div class='row'>
                <a href="${cols[i].channel.url}" target="_blank">
                    <div class='col'>
                        <div class='preview'>
                            <div class="placeholder"></div>
                            <img src="${cols[i].preview.medium}" 
                            onload= "this.style.opacity=1;"/>
                        </div>
                        <div class='bottom'>
                            <div class='bottom__avatar'>
                                <img src="${cols[i].channel.logo}" />
                            </div>
                            <div class='bottom__intro'>
                                <div class='owner__name'>
                                    ${cols[i].channel.status}
                                </div>
                                <div class='channel__name'>
                                    ${cols[i].channel.display_name}
                                </div>
                                <span class='viewers'>${cols[i].channel.views}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }
        row.innerHTML += result;  // 然後在把 result 給 row
    } else {
        alert('有什麼地方出錯了！！');
        // We reached our target server, but it returned an error
    }
};

xhr.onerror = function() {
  // There was a connection error of some sort
  console.log('Request error...')
};

xhr.send();

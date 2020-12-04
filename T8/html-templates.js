
exports.geraPostConfirm = geraPostConfirm
exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList( files, d){
    let pagHTML = `
      <html>
          <head>
              <title>File List</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/imagens.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>

              <div class="w3-container w3-teal">
                  <h2 class="w3-left">File List</h2>
                  <h3 class="w3-right"><a href='/files/upload'>Register</a></h3>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach( f => {
      pagHTML += `
          <tr onclick='showImage(\"${f.name}", \"${f.mimetype}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.desc}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
  
    pagHTML += `
          </table>
          <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; text-align: center;">
            <h3>TPC 8</h3>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }

// File Form HTML Page Template ------------------------------------------
function fileForm( d ){
    return `
    <html>
        <head>
            <title>File Upload</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <script src="/jquery-3.5.1.min.js"></script>
            <script src="/imagens.js"></script>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>File Upload</h2>
            </div>
            <br/>
            
            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data">
                <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-teal">Description</label>
                    </div>
                
                    <div class="w3-col s9 w3-border">
                        <input class="w3-input w3-border w3-light-grey" type="text" name="desc" required>
                    </div>
                </div>
                
                <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-teal">Select file</label>
                    </div>
                
                    <div class="w3-col s9 w3-border">
                        <input class="w3-input w3-border w3-light-grey" type="file" name="myFile" required>
                    </div>
                </div>

                <div id="addedFields">
                </div>
                
                <input class="w3-btn w3-blue-grey" type="submit" value="Submit"/>
                <button class="w3-btn w3-teal" type="button" onclick='moreFields()'>More Files</button>
            </form>
            
            <div style="margin-bottom: 65px;"></div>

            <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; text-align: center;">
              <h3>TPC 8</h3>
            </div>
        </body>
    </html>
    `
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( aluno, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/alunos/${aluno.id}">Aceda aqui à sua página."</a></p>
            </div>

            <div class="w3-container w3-teal" style="position: fixed; left: 0; bottom: 0; width: 100%; text-align: center;">
                <h3>TPC 8</h3>
            </div>
        </div>
    </body>
    </html>
    `
}
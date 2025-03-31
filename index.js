const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Servindo arquivos estáticos (se você quiser usar arquivos HTML, CSS, JS)
app.use(express.static('public'));

// Rota principal - Página inicial com botão de download
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PS3 Download</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
          }
          .container {
            text-align: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .btn {
            padding: 15px 30px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .btn:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Iniciar Download no PS3</h1>
          <button class="btn" onclick="startDownload()">Clique para Iniciar Download</button>
        </div>

        <script>
          function startDownload() {
            fetch('/download')
              .then(response => {
                if (response.ok) {
                  alert('Download iniciado!');
                } else {
                  alert('Falha ao iniciar download');
                }
              });
          }
        </script>
      </body>
    </html>
  `);
});

// Rota para o download
app.get('/download', (req, res) => {
  const fileUrl = "https://dn720202.ca.archive.org/0/items/sony_playstation3_b_part1/Back%20to%20the%20Future%20-%20The%20Game%20%28Europe%29%20%28En%2CFr%2CDe%29.iso";
  const cookies = "donation-identifier=cf2df63433c94029107b4d8c98de722b; "
                + "view-search=tiles; showdetails-search=; "
                + "abtest-identifier=237063cb5b53d6175c282df626d055dd; "
                + "test-cookie=1; logged-in-sig=1774073859%201742537859%20jcq%2FrZTsTrxInzMQegPMat4yfr7VwXbD5yl34WYjExz3arRTsqpWapAbX9FfhrfnhU1xSV%2FPVG2EJJ8K7Sd9ZITysxJUAR8KklDqSD2Q0gsHBZkNwI0m4tvOxm6uIZKr6ELYhABHqRjUEJKK10V%2BO2hxXKr2DCOb5JtOXc6nlot%2F6k8%2FN0%2F9KXTMt6qktp1i4F0kAbfsDdru8lIXUCmn%2FdoCXA0o8fZFr8HtfxjpeYKSjV8xFiPpV7EJFGM%2BBqwBgKdomrYHZ8i0F5qW5ArV47tWUaIlvq%2F%2F0AdB%2FYp%2Bqo9toRhcFBCCj%2BlF17km9CH%2FZ3Ry6f6%2Bsg2ryFE3dFDzGQ%3D%3D; "
                + "logged-in-user=estabiomarcos740%40gmail.com; "
                + "donation=x";

  const filename = "Back_to_the_Future_The_Game_Europe.iso";

  // Definindo cabeçalhos para o download
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Connection", "keep-alive");

  // Enviando comando de download direto para o PS3
  const downloadCommand = `http://localhost/popup.ps3/Iniciando%20Download!;/wait.ps3?3;/xmb.ps3/download.ps3?to=/dev_hdd0/PS3ISO&url=${fileUrl}`;

  // Redirecionando para o comando de download
  res.redirect(downloadCommand);
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

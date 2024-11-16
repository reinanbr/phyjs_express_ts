
$('#footer').append(`
<hr>
<h4 style='color:gray'> Campo Elétrico e Superfícies Equipotenciais</h4>
<p style='color:gray'>
Em um capacitor com placas paralelas, o campo elétrico entre as placas é uniforme e direcionado perpendicularmente às placas.<br>As linhas equipotenciais são linhas imaginárias que conectam pontos com o mesmo potencial elétrico. <br>No caso de um capacitor de placas paralelas, as linhas equipotenciais são perpendiculares às linhas de campo elétrico e paralelas às placas.</p>


<p style='color:gray'>As linhas equipotenciais são perpendiculares ao campo elétrico. <br>Se você visualizar as linhas de campo elétrico, elas se estenderiam de uma placa à outra, de forma uniforme, com as linhas equipotenciais cortando-as perpendicularmente.</p>

<p style='color:gray'>Em um capacitor ideal (placas infinitamente grandes e paralelas), as linhas equipotenciais são linhas retas uniformemente espaçadas, e o campo elétrico entre as placas é constante. <br>Essa configuração facilita os cálculos e a compreensão do comportamento elétrico do capacitor.</p>

<img src='https://static.preparaenem.com/conteudo_legenda/3e1cda22b92d4bc6643a21709c64abf8.jpg'>
<br><p><a href='https://www.preparaenem.com/fisica/superficies-equipotenciais.htm' class='text-white'><i><small>Fonte: PreparaEnem</small></i> </a></p><br><br>

<p style='color:gray'>A equação do campo elétrico relacionado ao potencial é dado por:<br><br> E(d) = V/d <br><br>E<i> é vetor do campo elétrico </i><br>V<i> é potencial presente</i><br>d<i> é a distância do ponto medido a fonte de carga</i><br> </p>

<br><br><br>

<script type="text/javascript" async
src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>

<footer class="text-center text-white" style="background-color:#080a11;">
    <!-- Grid container -->
    <div class="container p-4 pb-0">
        <!-- Section: Social media -->

        <!-- Section: Social media -->
    </div>
    <!-- Grid container -->
    <section class="sectFooter" style="color:gray">
        <div class="container text-center text-md-start mt-3">
            <!-- Grid row -->
            <div class="row mt-3">
                <!-- Grid column -->
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <!-- Content -->
                    <h6 class="text-uppercase fw-bold mb-4">
                        <i class="fas fa-gem me-3"></i>©2023
                    </h6>
                    <p>
                    <div class="container p-4 pb-0">
                        <!-- Section: Social media -->
                        <section class="mb-4">

                            <!-- Twitter -->
                            <a class="btn btn-outline-light btn-floating m-1" title="Twitter - BezerraReinan"
                                href="https://twitter.com/BezerraReinan" role="button"><i
                                    class="bi bi-twitter"></i></a>

                            <!-- Instagram -->
                            <a class="btn btn-outline-light btn-floating m-1" title="Instagram - reinanbr_"
                                href="https://www.instagram.com/reinanbr_/" role="button"><i
                                    class="bi bi-instagram"></i></a>

                            <!-- Github -->
                            <a class="btn btn-outline-light btn-floating m-1" title="GitHub - ReinanBr"
                                href="https://github.com/reinanbr" role="button"><i class="bi bi-github"></i></a>
                        </section>
                        <br /><br /><br />
                        <!-- Section: Social media -->
                    </div>
                    <hr style="background-color:gray"/>
                    </p>
                </div>
                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    <!-- Links -->
                    <h6 class="text-uppercase fw-bold mb-4">
                        Temas
                    </h6>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Mecânica e Dinâmica</a>
                    </p>

                    <p>
                        <a href="#!" class="text-reset">Fluídos</a>

                    </p>
                    <p>
                        <a href="#!" class="text-reset">Termodinâmica</a>

                    </p>
                    <p>
                        <a href="#!" class="text-reset">Ondas</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Eletromagnetísmo</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Física Moderna</a>

                    </p>

                </div>
                <!-- Grid column -->

                <!-- Grid column -->

                <!-- Grid column -->

                <!-- Grid column -->
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <!-- Links -->
                    <h6 class="text-uppercase fw-bold mb-4">Contato</h6>
                    <p>
                        <i class="fas fa-envelope me-3"></i>
                        perseu912@gmail.com
                    </p>

                    <p><i class="fas fa-print me-3"></i> + 55 74 9 9932-9688</p>
                    <p><i class="fas fa-home me-3"></i> Petrolina - PE </p>
                    <p>
                        <a href="/privacity" class="text-reset">Politíca de Privacidade</a>
                    </p>

                </div>
                <!-- Grid column -->
            </div>
            <!-- Grid row -->
        </div>
    </section>
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: #030706; color:#566463">
        <small> © 2023
            <a class="text-white" style='color:#566463' href="https://github.com/reinanbr">ReySofts</a></small>
    </div>
    <!-- Copyright -->
</footer>
`)



function alertBt(title, text, idDivPainel, mode) {
    $(`#${idDivPainel}`).append(` <div class="alert alert-${mode} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${text}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`)
}



function sendFeedBack() {
    let feed = $('#inputComment').val()
    console.log(feed)
    let userAgent = navigator.userAgent;
    let urlName = window.location.href
    fetch(`https://reysofts.com.br/apis/cardapio/save_comment.php?userDevice=${userAgent}&urlName=${urlName}&comment=${feed}`)
        .then((res) => {
            console.log(res)
            if (!res.ok) {

                throw new Error('ERROR IN REQUEST: ' + res.status);
            }
            return res.json()
        }).then((statusComment) => {
            if (statusComment.result) {

                alertBt(`Muito obrigado!`,
                    ` Seu comentário foi enviado e salvo com sucesso!`,
                    'painelAlert',
                    'success')

                $('#inputComment').val('')
            }
            else {
                alertBt(`Oops!`,
                    ` Tivemos algum problema com salvamento de seu comentario. Tente novamente mais tarde.`,
                    'painelAlert',
                    'Alert')

            }
        })
        .catch((e) => {
            alertBt('Oops!',
                `Tivemos algum problema com o nosso servidor. Tente novamente mais tarde. ERROR: ${e}`,
                'painelAlert',
                'danger')
            console.log(e)
        })
}



$('#btnSendFeed').click(sendFeedBack)



$('#rangeE').on('input', function () {
    // Atualiza o valor exibido
    let valueE = $(this).val()
    $('#displayValue').text(`${valueE}V`);
});



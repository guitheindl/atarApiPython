$(function() { 
    
    function exibir_motos() {
        $.ajax({
            url: 'http://localhost:5000/listar_motos',
            method: 'GET',
            dataType: 'json', 
            success: listarMotos, 
            error: function() {
                alert(" E R R O ");
            }
        });

        function listarMotos(motos) {
            $("#corpoTabelaMotos").empty();
            mostrarConteudo("tabelaMotos")
            for (moto of motos) { 
                novaLinha = `<tr id="linha_${moto.id}"> 
                            <td>${moto.modelo}</td> 
                            <td>${moto.cilindradas}</td> 
                            <td>${moto.motor}</td> 
                            <td><a href=# id="${moto.id}" class="excluir_moto">
                            <p class="badge badge-danger">Excluir</p> </a> </td>
                          </tr>`;
                $('#tabelaMotos').append(novaLinha); 
            }
        }
    }

    function mostrarConteudo(identificador) {
        $("#tabelaMotos").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarMotos", function() {
        exibir_motos();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrarConteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirMoto", function() {
        modelo = $("#campoModelo").val();
        cilindradas = $("#campoCilindradas").val();
        motor = $("#campoMotor").val();
        var dados = JSON.stringify({ modelo: modelo, cilindradas: cilindradas, motor: motor });
        $.ajax({
            url: 'http://localhost:5000/incluir_moto',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json',
            data: dados, 
            success: motoIncluida, 
            error: erroAoIncluir
        });
        function motoIncluida (retorno) {
            if (retorno.resultado == "ok") {
                alert("moto incluída com sucesso!");
                $("#campoModelo").val("");
                $("#campoCilindradas").val("");
                $("#campoMotor").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirMoto').on('hide.bs.modal', function (e) {
        if (! $("#tabelaMotos").hasClass('invisible')) {
            exibir_motos();
        }
    });

    $(document).on("click", ".excluir_moto", function() {
        var idMoto = $(this).attr("id");
    
        $.ajax({
          url: `http://localhost:5000/excluir_moto/${idMoto}`,
          type: "DELETE",
          dataType: 'json',
          success: excluirMoto,
          error: erroAoExcluir
        });
    
        function excluirMoto(retorno) {
          if (retorno.resultado === "ok") {
            $(`#linha_${idMoto}`).fadeOut(1000, () => {
                alert("Moto excluída com sucesso!")
            });
          } else {
            alert(`ERRO: ${retorno.resultado}: ${retorno.detalhes}`);
          }
        }
    
        function erroAoExcluir(retorno) {
          alert("Error: Search on back-end");
        }
      });
    

    mostrarConteudo("conteudoInicial");
});

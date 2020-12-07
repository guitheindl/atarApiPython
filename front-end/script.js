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
            mostrarConteudo("motos")
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

    function exibir_mecanicos() {
        $.ajax({
            url: 'http://localhost:5000/listar_mecanicos',
            method: 'GET',
            dataType: 'json', 
            success: listarMecanicos, 
            error: function() {
                alert(" E R R O ");
            }
        });

        function listarMecanicos(mecanicos) {
            $("#corpoTabelaMecanicos").empty();
            mostrarConteudo("mecanicos")
            for (mecanico of mecanicos) { 
                novaLinha = `<tr id="linha_${mecanico.id}"> 
                            <td>${mecanico.nome}</td> 
                            <td>${mecanico.cargo}</td> 
                          </tr>`;
                $('#tabelaMecanicos').append(novaLinha); 
            }
        }
    }

    function exibir_oficinas() {
        $.ajax({
            url: 'http://localhost:5000/listar_oficinas',
            method: 'GET',
            dataType: 'json', 
            success: listarOficinas, 
            error: function() {
                alert(" E R R O ");
            }
        });

        function listarOficinas(oficinas) {
            $("#corpoTabelaOficinas").empty();
            mostrarConteudo("oficinas")
            for (oficina of oficinas) { 
                novaLinha = `<tr id="linha_${oficina.id}"> 
                            <td>${oficina.nome}</td> 
                            <td>${oficina.endereco}</td> 
                            <td>${oficina.moto.modelo}</td> 
                            <td>${oficina.moto.cilindradas}</td> 
                            <td>${oficina.moto.motor}</td> 
                            <td>${oficina.mecanico.nome}</td> 
                            <td>${oficina.mecanico.cargo}</td> 
                          </tr>`;
                $('#tabelaOficinas').append(novaLinha); 
            }
        }
    }

    function mostrarConteudo(identificador) {
        $("#motos").addClass('d-none');
        $("#mecanicos").addClass('d-none');
        $("#oficinas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');      
    }

    $(document).on("click", "#linkListarMotos", function() {
        exibir_motos();
    });

    $(document).on("click", "#linkListarMecanicos", function() {
        exibir_mecanicos();
    });

    $(document).on("click", "#linkListarOficinas", function() {
        exibir_oficinas();
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

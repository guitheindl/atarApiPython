$(function() { 
    
    function mostrarUsuarios() {
        $.ajax({
            url: 'http://localhost:5000/listar_users',
            method: 'GET',
            dataType: 'json', 
            success: listarUsers, 
            error: function() {
                alert(" E R R O ");
            }
        });

        function listarUsers(users) {
            $("#corpoTabelausuarios").empty();
            mostrarConteudo("usuarios")
            for (user of users) { 
                novaLinha = `<tr id="linha_${user.id}"> 
                            <td>${user.name}</td> 
                            <td>${user.cpf}</td>
                            <td>${user.email}</td> 
                            <td><a href=# id="${user.id}" class="excluirUsuario">
                            <p class="badge badge-danger">Excluir</p> </a> </td>
                          </tr>`;
                $('#tabelausuarios').append(novaLinha); 
            }
        }
    }

    function mostrarConteudo(identificador) {
        $("#usuarios").addClass('d-none');
        $("#mecanicos").addClass('d-none');
        $("#oficinas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');      
    }

    $(document).on("click", "#linkListarUsuarios", function() {
        mostrarUsuarios();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrarConteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirUsuario", function() {
        var dados = JSON.stringify({ 
            name: $("#campoNome").val(), 
            lastname: $("#campoSobrenome").val(), 
            cpf: $("#campoCPF").val(), 
            email: $("#campoEmail").val(), 
            fone: $("#campoTelefone").val(), 
            dtNasc: $("#campoDtNascimento").val()
        });
        $.ajax({
            url: 'http://localhost:5000/incluir_user',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json',
            data: dados, 
            success: usuarioIncluso, 
            error: erroAoIncluir
        });
        function usuarioIncluso (retorno) {
            if (retorno.resultado == "ok") {
                alert("Usuário incluído com sucesso!");
                $("#campoNome").val(''), 
                $("#campoSobrenome").val(''), 
                $("#campoCPF").val(''), 
                $("#campoEmail").val(''), 
                $("#campoTelefone").val(''), 
                $("#campoDtNascimento").val('')
                $('#modalIncluirUsuario').modal('hide')
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirUsuario').on('hide.bs.modal', function (e) {
        if (! $("#tabelausuarios").hasClass('invisible')) {
            mostrarUsuarios();
        }
    });

    $(document).on("click", ".excluirUsuario", function() {
        var idUsuario = $(this).attr("id");
    
        $.ajax({
          url: `http://localhost:5000/excluir_user/${idUsuario}`,
          type: "DELETE",
          dataType: 'json',
          success: excluirUsuario,
          error: erroAoExcluir
        });
    
        function excluirUsuario(retorno) {
          if (retorno.resultado === "ok") {
            $(`#linha_${idUsuario}`).fadeOut(1000, () => {
                alert("Usuário excluído com sucesso!")
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

    mostrarUsuarios();
});

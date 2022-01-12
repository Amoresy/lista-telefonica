angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator, $location) {

    $scope.app = "Lista Telefônica";

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().then(function (response) {
            $scope.operadoras = response.data;

        });
    };

    $scope.adicionarContatos = function (contato) {
        contatosAPI.saveContato(contato).then(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos");
        });
    };

    carregarOperadoras();

});
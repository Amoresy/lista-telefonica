angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatosAPI, operadorasAPI, serialGenerator) {

    $scope.app = "Lista Telefônica";

    var carregarContatos = function () {
        contatosAPI.getContatos().then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (response, status) {
            $scope.catch = "O banco de dados não está conectado!";
        });
    };

    var carregarOperadoras = function () {
        operadorasAPI.getOperadoras().then(function (response) {
            $scope.operadoras = response.data;

        });
    };

    $scope.adicionarContatos = function (contato) {
        contato.serial = serialGenerator.generate;
        $scope.contatos.push(angular.copy(contato));
        contatosAPI.saveContato(contato).then(function (data) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        })
    };

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();
});
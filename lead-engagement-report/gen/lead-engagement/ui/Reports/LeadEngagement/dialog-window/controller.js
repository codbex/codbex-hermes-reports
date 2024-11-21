angular.module('page', ["ideUI", "ideView"])
	.controller('PageController', ['$scope', 'ViewParameters', function ($scope, ViewParameters) {

		$scope.entity = {};

		let params = ViewParameters.get();
		if (Object.keys(params).length) {
			$scope.action = "select";;

			if (params.entity['leadactionsDate']) {
				params.entity['leadactionsDate'] = new Date(params.entity['leadactionsDate']);
			}
			$scope.entity = params.entity;
		}

	}]);
angular.module('page', ["ideUI", "ideView", "entityApi"])
    .config(["messageHubProvider", function (messageHubProvider) {
        messageHubProvider.eventIdPrefix = 'opportunity-win-los-analysis-report.Reports.LeadEngagement';
    }])
    .config(["entityApiProvider", function (entityApiProvider) {
        entityApiProvider.baseUrl = "/services/ts/opportunity-win-los-analysis-report/gen/opportunity-win-los-analysis/api/LeadEngagement/LeadEngagementService.ts";
    }])
    .controller('PageController', ['$scope', 'messageHub', 'entityApi', 'ViewParameters', function ($scope, messageHub, entityApi, ViewParameters) {

		let params = ViewParameters.get();
		if (Object.keys(params).length) {         
            const filterEntity = params.filterEntity ?? {};

			const filter = {
			};

            $scope.filter = filter;
		}

        $scope.loadPage = function (filter) {
            if (!filter && $scope.filter) {
                filter = $scope.filter;
            }
            let request;
            if (filter) {
                request = entityApi.search(filter);
            } else {
                request = entityApi.list();
            }
            request.then(function (response) {
                if (response.status != 200) {
                    messageHub.showAlertError("LeadEngagement", `Unable to list/filter LeadEngagement: '${response.message}'`);
                    return;
                }

                response.data.forEach(e => {
                    if (e['leadactionsDate']) {
                        e['leadactionsDate'] = new Date(e['leadactionsDate']);
                    }
                });

                $scope.data = response.data;
                setTimeout(() => {
                    window.print();

                }, 250);
            });
        };
        $scope.loadPage($scope.filter);

        window.onafterprint = () => {
            messageHub.closeDialogWindow("opportunity-win-los-analysis-report-Reports-LeadEngagement-print");
        }

    }]);

const viewData = {
    id: 'opportunity-pipeline-report-Reports-OpportunityPipelineReport-print',
    label: 'Print',
    link: '/services/web/opportunity-pipeline-report/gen/opportunity-pipeline/ui/Reports/OpportunityPipelineReport/dialog-print/index.html',
    perspective: 'Reports',
    view: 'OpportunityPipelineReport',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}
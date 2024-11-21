const viewData = {
    id: 'opportunity-actions-report-Reports-OpportunityActionsReport-print',
    label: 'Print',
    link: '/services/web/opportunity-actions-report/gen/opportunity-actions/ui/Reports/OpportunityActionsReport/dialog-print/index.html',
    perspective: 'Reports',
    view: 'OpportunityActionsReport',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}
const viewData = {
    id: 'opportunity-priority-report-Reports-OpportunityPriority-print',
    label: 'Print',
    link: '/services/web/opportunity-priority-report/gen/opportunity-priority/ui/Reports/OpportunityPriority/dialog-print/index.html',
    perspective: 'Reports',
    view: 'OpportunityPriority',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}
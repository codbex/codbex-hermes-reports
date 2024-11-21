const viewData = {
    id: 'lead-engagement-report-Reports-LeadEngagement-print',
    label: 'Print',
    link: '/services/web/lead-engagement-report/gen/lead-engagement/ui/Reports/LeadEngagement/dialog-print/index.html',
    perspective: 'Reports',
    view: 'LeadEngagement',
    type: 'page',
    order: 10
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}
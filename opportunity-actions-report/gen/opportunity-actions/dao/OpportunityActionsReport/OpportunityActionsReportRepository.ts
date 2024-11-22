import { Query, NamedQueryParameter } from "sdk/db";

export interface OpportunityActionsReport {
    readonly 'Id': number;
    readonly 'Name': string;
    readonly 'Date': Date;
    readonly 'Action Type': string;
    readonly 'Note': string;
}

export interface OpportunityActionsReportFilter {
}

export interface OpportunityActionsReportPaginatedFilter extends OpportunityActionsReportFilter {
    readonly "$limit"?: number;
    readonly "$offset"?: number;
}

export class OpportunityActionsReportRepository {

    private readonly datasourceName?: string;

    constructor(datasourceName?: string) {
        this.datasourceName = datasourceName;
    }

    public findAll(filter: OpportunityActionsReportPaginatedFilter): OpportunityActionsReport[] {
        const sql = `
            SELECT Opportunity.OPPORTUNITY_ID as "Id", Customer.CUSTOMER_NAME as "Name", OpportunityAction.OPPORTUNITYACTION_DATE as "Date", ActionType.ACTIONTYPE_NAME as "Action Type", OpportunityNote.OPPORTUNITYNOTE_NOTE as "Note"
            FROM CODBEX_OPPORTUNITY as Opportunity
              INNER JOIN CODBEX_CUSTOMER Customer ON Opportunity.OPPORTUNITY_CUSTOMER = Customer.CUSTOMER_ID
              INNER JOIN CODBEX_OPPORTUNITYACTION OpportunityAction ON Opportunity.OPPORTUNITY_ID = OpportunityAction.OPPORTUNITYACTION_OPPORTUNITY
              INNER JOIN CODBEX_ACTIONTYPE ActionType ON OpportunityAction.OPPORTUNITYACTION_TYPE = ActionType.ACTIONTYPE_ID
              INNER JOIN CODBEX_OPPORTUNITYNOTE OpportunityNote ON OpportunityAction.OPPORTUNITYACTION_NOTE = OpportunityNote.OPPORTUNITYNOTE_ID
            ORDER BY OPPORTUNITYACTION_DATE DESC
            ${Number.isInteger(filter.$limit) ? ` LIMIT ${filter.$limit}` : ''}
            ${Number.isInteger(filter.$offset) ? ` OFFSET ${filter.$offset}` : ''}
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName);
    }

    public count(filter: OpportunityActionsReportFilter): number {
        const sql = `
            SELECT COUNT(*) as REPORT_COUNT FROM (
                SELECT Opportunity.OPPORTUNITY_ID as "Id", Customer.CUSTOMER_NAME as "Name", OpportunityAction.OPPORTUNITYACTION_DATE as "Date", ActionType.ACTIONTYPE_NAME as "Action Type", OpportunityNote.OPPORTUNITYNOTE_NOTE as "Note"
                FROM CODBEX_OPPORTUNITY as Opportunity
                  INNER JOIN CODBEX_CUSTOMER Customer ON Opportunity.OPPORTUNITY_CUSTOMER = Customer.CUSTOMER_ID
                  INNER JOIN CODBEX_OPPORTUNITYACTION OpportunityAction ON Opportunity.OPPORTUNITY_ID = OpportunityAction.OPPORTUNITYACTION_OPPORTUNITY
                  INNER JOIN CODBEX_ACTIONTYPE ActionType ON OpportunityAction.OPPORTUNITYACTION_TYPE = ActionType.ACTIONTYPE_ID
                  INNER JOIN CODBEX_OPPORTUNITYNOTE OpportunityNote ON OpportunityAction.OPPORTUNITYACTION_NOTE = OpportunityNote.OPPORTUNITYNOTE_ID
                ORDER BY OPPORTUNITYACTION_DATE DESC
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}
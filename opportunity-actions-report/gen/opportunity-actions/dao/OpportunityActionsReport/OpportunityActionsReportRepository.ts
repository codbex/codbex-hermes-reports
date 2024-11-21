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
            SELECT Opportunity.OPPORTUNITY_ID as "Id", Customer.CUSTOMER_NAME as "Name", Opportunity Action.OPPORTUNITYACTION_DATE as "Date", Action Type.ACTIONTYPE_NAME as "Action Type", Opportunity Note.OPPORTUNITYNOTE_NOTE as "Note"
            FROM CODBEX_OPPORTUNITY as codbexOpportunity
              INNER JOIN CODBEX_CUSTOMER Customer ON Opportunity.OPPORTUNITY_CUSTOMER = Customer.CUSTOMER_ID
              INNER JOIN CODBEX_OPPORTUNITYACTION Opportunity Action ON Opportunity.OPPORTUNITY_ID = Opportunity Action.OPPORTUNITYACTION_OPPORTUNITY
              INNER JOIN CODBEX_ACTIONTYPE Action Type ON Opportunity Action.OPPORTUNITYACTION_TYPE = Action Type.ACTIONTYPE_ID
              INNER JOIN CODBEX_OPPORTUNITYNOTE codbexOpportunitynote ON Opportunity Action.OPPORTUNITYACTION_NOTE = Opportunity Note.OPPORTUNITYNOTE_ID
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
                SELECT Opportunity.OPPORTUNITY_ID as "Id", Customer.CUSTOMER_NAME as "Name", Opportunity Action.OPPORTUNITYACTION_DATE as "Date", Action Type.ACTIONTYPE_NAME as "Action Type", Opportunity Note.OPPORTUNITYNOTE_NOTE as "Note"
                FROM CODBEX_OPPORTUNITY as codbexOpportunity
                  INNER JOIN CODBEX_CUSTOMER Customer ON Opportunity.OPPORTUNITY_CUSTOMER = Customer.CUSTOMER_ID
                  INNER JOIN CODBEX_OPPORTUNITYACTION Opportunity Action ON Opportunity.OPPORTUNITY_ID = Opportunity Action.OPPORTUNITYACTION_OPPORTUNITY
                  INNER JOIN CODBEX_ACTIONTYPE Action Type ON Opportunity Action.OPPORTUNITYACTION_TYPE = Action Type.ACTIONTYPE_ID
                  INNER JOIN CODBEX_OPPORTUNITYNOTE codbexOpportunitynote ON Opportunity Action.OPPORTUNITYACTION_NOTE = Opportunity Note.OPPORTUNITYNOTE_ID
                ORDER BY OPPORTUNITYACTION_DATE DESC
            )
        `;

        const parameters: NamedQueryParameter[] = [];

        return Query.executeNamed(sql, parameters, this.datasourceName)[0].REPORT_COUNT;
    }

}
// @flow
import MySQLTable from "./mysqlTable";

class RevisionTable extends MySQLTable {
    constructor() {
        super();
        this.column("name").varChar(100);
        this.column("title").varChar(300);
        this.column("slug").varChar(300);
        this.column("page").char(24);
        this.column("settings").text();
        this.column("content").text();
        this.column("active").tinyInt();
    }
}

RevisionTable.setName("Cms_Revisions");

export default RevisionTable;

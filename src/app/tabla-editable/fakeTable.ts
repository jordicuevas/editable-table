export const tableData = {
    tableName         : 'Tabla Configurable', // table name
    tableIcon         : '', // path to icon
    hasExpandible     : true, // true or false
    primaryFields     : [], // displayColumns,
    showHideFields    : [], // fields to show and hide columns agregar campo visible true visible false 
    expandibleSections: [
        {
            sectionType  : 'table',
            sectionName  : '',
            sectionIcon  : '',
            sectionFields: []
        },
        {
            sectionType  : 'grid',
            sectionName  : '',
            sectionIcon  : '',
            sectionFields: []
        },
    ] ,
    filters: [
        {
            filterId      : 1 ,
            filterName    : '',
            filterType    : '', // text, select, date
            filterWhere   : '',
            filterOptions : [], // case is a select
            operator      : '' // igual, contiene, nulo, diferente que
        }
    ]

};

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './table.scss';

const NO_DATA_STATE = '-';

/**
 * This function return the alignment property based on the prop coming
 * @param {string} Alignment property coming in props
 * @param {number} index
 * @returns {string} Alignment property
 */
const setAlignment = (aligmentProp, index) => {
  let align = 'left';
  if (aligmentProp === 'default' && index !== 0) {
    align = 'right';
  }

  if (aligmentProp === 'right') {
    align = 'right';
  }

  if (aligmentProp === 'center') {
    align = 'center';
  }

  return align;
};

/**
 * TableCell component contains native td tag implementation with some classes to handle the padding horizontally/vertically
 * DataNot Available state can also be handled.
 * @param {TableCell~propTypes} props - TableCell props.
 * @returns {ReactElement}
 */
const TableCell = props => {
  const { cellData, children, className, width, paddingLevelY, paddingLevelX, desktop, mobile, ...otherProps } = props;

  const tableCellClasses = classnames('table-cell', `py-${paddingLevelY}x`, `px-${paddingLevelX}x`, className);
  return (
    <td className={tableCellClasses} style={{ minWidth: width, width }} {...otherProps}>
      {children || cellData || NO_DATA_STATE}
    </td>
  );
};

/**
 * Complete props of TableCell.
 * @typedef {Object} TableCell~propTypes
 * @property {(string|node)} [cellData=''] This hold the data/node to be displayed on the cell.
 * @property {string} [className=''] className for the TableCell.
 * @property {string} [width='auto'] width for the Table Cell.
 * @property {number} [paddingLevelY=2] paddingLevelY for the tabelCell.
 * @property {number} [paddingLevelX=0] paddingLevelX for the tabelCell.
 * @property {(string|node)} [children=null] children for the Table Cell.
 * @property {bool} [mobile=false] - to be displayed only on mobile.
 * @property {bool} [desktop=false] - to be displayed only on desktop.
 */
TableCell.propTypes = {
  cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  width: PropTypes.string,
  paddingLevelY: PropTypes.number,
  paddingLevelX: PropTypes.number,
  showNoDataState: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  mobile: PropTypes.bool,
  desktop: PropTypes.bool
};

TableCell.defaultProps = {
  cellData: '',
  className: '',
  width: 'auto',
  children: null,
  showNoDataState: true,
  paddingLevelY: 2,
  paddingLevelX: 0,
  mobile: false,
  desktop: false
};

/**
 * This component is responsible to render the TableRow component, this is a default TableRow called
 * from the Table Component. default Columns can either be created from data or with rowProps.
 * @param {TableRow~propTypes} props - TableRow props.
 * @returns {ReactElement}
 */
const TableRow = props => {
  const {
    rowData,
    children,
    className,
    tableCellClassName,
    columnAlignment,
    rowProps: { columns },
    ...otherProps
  } = props;
  const tableRowClasses = classnames('table-row', className);
  const allChild = React.Children.toArray(children);

  return (
    <tr className={tableRowClasses}>
      {(children && allChild.map(child => React.cloneElement(child, { ...otherProps }))) ||
        (columns && columns.length
          ? columns.map(
              ({ key, ...htmlProps }, index) =>
                key && (
                  <TableCell
                    cellData={rowData[key]}
                    key={`cell-${index}`}
                    align={setAlignment(columnAlignment, index)}
                    className={tableCellClassName}
                    {...otherProps}
                    {...htmlProps}
                  />
                )
            )
          : Object.values(rowData).map((celldata, index) => (
              <TableCell cellData={celldata} key={`cell-${index}`} className={tableCellClassName} {...otherProps} />
            )))}
    </tr>
  );
};

/**
 * Complete props of TableRow.
 * @typedef {Object} TableRow~propTypes
 * @property {Object} [rowData={}] This hold the rowData for the Row.
 * @property {string} [className=''] ClassName for the TableRow.
 * @property {string} [tableCellClassName = ''] tableCellClassName for table cell.
 * @property {string} columnAlignment columnAlignment for table cell.
 * @property {Object} [rowProps = {}] rowProps object for the TableRow.
 * @property {(string|node)} [children = null] Children for the Table Row.
 */
TableRow.propTypes = {
  rowData: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  tableCellClassName: PropTypes.string,
  columnAlignment: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  rowProps: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.instanceOf(Object))
  })
};

TableRow.defaultProps = {
  rowData: {},
  className: '',
  columnAlignment: 'default',
  tableCellClassName: '',
  children: null,
  rowProps: {
    columns: []
  }
};

/**
 * TableHeaderCell component contains native th tag implementation, which can also be called from a custom Header component.
 * Sorting can also be added with headers passed as config.
 * @param {TableHeaderCell~propTypes} props - TableHeaderCell props.
 * @returns {ReactElement}
 */
const TableHeaderCell = props => {
  const {
    headerCelldata,
    children,
    paddingLevelHeaderY,
    paddingLevelHeaderX,
    className,
    desktop,
    mobile,
    ...otherProps
  } = props;

  const headerClasses = classnames(
    'table-header-cell',
    `py-${paddingLevelHeaderY}x`,
    `px-${paddingLevelHeaderX}x`,
    className
  );
  let headerLabel = headerCelldata;
  let key;
  let htmlProps = {};
  if (typeof headerLabel === 'object') {
    const { label, sortKey, desc, ...remProps } = headerCelldata;
    htmlProps = remProps;
    headerLabel = label;
  }
  return (
    headerLabel !== null && (
      <th className={headerClasses} {...otherProps} {...htmlProps}>
        {children || headerLabel}
      </th>
    )
  );
};

/**
 * Complete props of TableHeaderCell.
 * @typedef {Object} TableHeaderCell~propTypes
 * @property {Object|string} [headerCelldata=''] This hold headerCelldata for the headerCell.
 * @property {string} [className=''] ClassName for TableHeader cell.
 * @property {string} [activeSort='' ] Active Sort.
 * @property {func} [sortMethod=()=>{}] function for Active Sort.
 * @property {(string|node)} [children=null] Children for the Table Row.
 * @property {number} [paddingLevelHeaderY=1] paddingLevelHeaderY for the TableHeaderCell.
 * @property {number} [paddingLevelHeaderX=0] paddingLevelHeaderX for the TableHeaderCell.
 * @property {bool} [mobile=false] - to be displayed only on mobile.
 * @property {bool} [desktop=false] - to be displayed only on desktop.
 */
TableHeaderCell.propTypes = {
  headerCelldata: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired
    })
  ]),
  className: PropTypes.string,
  paddingLevelHeaderY: PropTypes.number,
  paddingLevelHeaderX: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sortMethod: PropTypes.func,
  activeSort: PropTypes.string,
  mobile: PropTypes.bool,
  desktop: PropTypes.bool
};

TableHeaderCell.defaultProps = {
  headerCelldata: '',
  className: '',
  paddingLevelHeaderY: 1,
  paddingLevelHeaderX: 0,
  children: null,
  sortMethod: () => {},
  activeSort: '',
  mobile: false,
  desktop: false
};

/**
 * TableHeader component contains native tr tag implementation and is generally a Default Header component which renders the Header for the Table.
 * @class
 * @param {TableHeader~propTypes} props - TableHeader props.
 * @returns {ReactElement}
 */
const TableHeader = props => {
  const { header, children, className, columnAlignment, tableHeaderCellClassName, ...otherProps } = props;
  const tableHeaderClasses = classnames('table-header', className);
  const allChild = React.Children.toArray(children);
  return (
    <tr className={tableHeaderClasses}>
      {(children && allChild.map(child => React.cloneElement(child, { ...otherProps }))) ||
        header.map((headerCelldata, idx) => (
          <TableHeaderCell
            headerCelldata={headerCelldata}
            key={`header-cell-${idx}`}
            align={setAlignment(columnAlignment, idx)}
            className={tableHeaderCellClassName}
            {...otherProps}
          />
        ))}
    </tr>
  );
};

/**
 * Complete props of TableHeader.
 * @typedef {Object} TableHeader~propTypes
 *
 * @property {(string[]|Object[])} [header=[]] This is data for the tableHeader.
 * @property {string} [className=''] ClassName for TableHeader cell.
 * @property {string} [tableHeaderCellClassName=''] tableHeaderCellClassName.
 * @property {(string|node)} [children=null] Children for the Table Row.
 */
TableHeader.propTypes = {
  header: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])),
  className: PropTypes.string,
  tableHeaderCellClassName: PropTypes.string,
  columnAlignment: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

TableHeader.defaultProps = {
  header: [],
  className: '',
  columnAlignment: 'default',
  tableHeaderCellClassName: '',
  children: null
};

/**
 * Table component is creating a table with defined header and data rows.
 * It consumes different components like TableHeader, TableRow and TableCell which can either be custom or default.
 * Supports sorting as well.
 * @class
 * @param {Table~propTypes} props - Table props.
 * @returns {ReactElement}
 */
const Table = props => {
  const {
    rowsData,
    header,
    customRow,
    customHeader,
    noBorder,
    noLastBorder,
    tableClassName,
    tableHeaderClassName,
    tableHeaderCellClassName,
    tableRowClassName,
    tableBodyClassName,
    tableBodySize,
    tableHeaderSize,
    rowProps,
    showNoDataState,
    tableCellClassName,
    paddingLevelHeaderX,
    paddingLevelHeaderY,
    paddingLevelX,
    paddingLevelY,
    ...otherProps
  } = props;
  const RowComponent = customRow || TableRow;
  const HeaderComponent = customHeader || TableHeader;
  const tableClasses = classnames(
    'default-table',
    noBorder && 'no-border',
    noLastBorder && 'no-last-border',
    tableClassName
  );

  return (
    <div className="table-wrapper">
      <table className={tableClasses}>
        {header && (
          <thead className={classnames('table-head', `table-head-${tableHeaderSize}`)}>
            <HeaderComponent
              header={header}
              className={tableHeaderClassName}
              tableHeaderCellClassName={tableHeaderCellClassName}
              paddingLevelHeaderX={paddingLevelHeaderX}
              paddingLevelHeaderY={paddingLevelHeaderY}
              {...otherProps}
            />
          </thead>
        )}
        <tbody className={classnames('table-body', tableBodyClassName, `table-body-${tableBodySize}`)}>
          {rowsData.map((rowData, index) => (
            <RowComponent
              rowData={rowData}
              key={`row-${index}`}
              className={tableRowClassName}
              rowProps={rowProps}
              showNoDataState={showNoDataState}
              tableCellClassName={tableCellClassName}
              paddingLevelX={paddingLevelX}
              paddingLevelY={paddingLevelY}
              {...otherProps}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Complete props of Table.
 * @typedef {Object} Table~propTypes
 *
 * @property {rowsData} - This is rowsData for the table.
 * @property {(string[]|Object[])} [header=null] Header as array of string or object.
 * @property {func} [customRow=null] CustomRow Component..
 * @property {func} [customHeader=null] CustomeHeader Component.
 * @property {bool} [noBorder=false] Flag for NoBorder variant.
 * @property {bool} [showNoDataState=false] Flag for NoData State.
 * @property {number} [paddingLevelHeaderY=1] PaddingLevelY for the TableHeaderCell.
 * @property {number} [paddingLevelHeaderX=0] PaddingLevelX for the TableHeaderCell.
 * @property {number} [paddingLevelY=2] PaddingLevelY for the TableBodyCell.
 * @property {number} [paddingLevelX=0] PaddingLevelX for the TableBodyCell.
 * @property {string} [tableClassName=''] This variable is used to override the default table styling.
 * @property {string} [tableHeaderClassName=''] This variable is used to override the default table header styling.
 * @property {string} [tableHeaderCellClassName=''] This variable is used to override the default table header cell styling.
 * @property {string} [tableRowClassName=''] This variable is used to override the default table row styling.
 * @property {string} [tableCellClassName=''] This variable is used to override the default table cell styling.
 * @property {string} [tableBodyClassName=''] This variable is used to override the default table body styling.
 * @property {bool} [noLastBorder=false] Flag for no last border variant.
 * @property {('small'|'medium'|'large')} [tableHeaderSize='medium'] This is used to set the size for Header.
 * @property {('default'|'left'|'right'|'center')} [columnAlignment='default'] This is used to set the alignment for each column.
 * @property {('small'|'medium'|'large')}  [tableBodySize='medium'] This is used to set the size for body content.
 * @property {object} [rowProps={}] Custom rows props for the rows.
 * @property {object} [columns=[]] Columns props for the rows
 */
Table.propTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  header: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])),
  customRow: PropTypes.func,
  customHeader: PropTypes.func,
  noBorder: PropTypes.bool,
  showNoDataState: PropTypes.bool,
  paddingLevelHeaderY: PropTypes.number,
  paddingLevelHeaderX: PropTypes.number,
  paddingLevelY: PropTypes.number,
  paddingLevelX: PropTypes.number,
  tableClassName: PropTypes.string,
  tableHeaderClassName: PropTypes.string,
  tableHeaderCellClassName: PropTypes.string,
  tableRowClassName: PropTypes.string,
  tableCellClassName: PropTypes.string,
  tableBodyClassName: PropTypes.string,
  noLastBorder: PropTypes.bool,
  tableHeaderSize: PropTypes.oneOf(['small', 'medium', 'large']),
  columnAlignment: PropTypes.oneOf(['default', 'left', 'right', 'center']),
  tableBodySize: PropTypes.oneOf(['small', 'medium', 'large']),
  rowProps: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.instanceOf(Object))
  })
};

Table.defaultProps = {
  header: null,
  customRow: null,
  customHeader: null,
  noBorder: false,
  showNoDataState: true,
  paddingLevelHeaderY: 1,
  paddingLevelHeaderX: 0,
  paddingLevelY: 2,
  paddingLevelX: 0,
  tableClassName: '',
  tableHeaderClassName: '',
  tableHeaderCellClassName: '',
  tableRowClassName: '',
  tableCellClassName: '',
  tableBodyClassName: '',
  noLastBorder: false,
  tableHeaderSize: 'medium',
  tableBodySize: 'medium',
  columnAlignment: 'default',
  rowProps: {
    columns: []
  }
};
export { Table, TableHeader, TableHeaderCell, TableRow, TableCell };

/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './table.scss';

/**
 * TableCell component contains native td tag implementation with some classes to handle the padding horizontally/vertically
 * DataNot Available state can also be handled.
 * @class
 * @param {TableCell~propTypes} props - TableCell props.
 * @returns {ReactElement}
 */
const TableCell = props => {
  const { cellData, children, className, width, ...otherProps } = props;

  const tableCellClasses = classnames('table-cell', className);
  return (
    <td className={tableCellClasses} style={{ minWidth: width, width }} {...otherProps}>
      {children || cellData}
    </td>
  );
};

TableCell.propTypes = {
  cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

TableCell.defaultProps = {
  cellData: '',
  className: '',
  width: 'auto',
  children: null
};

/**
 * This component is responsible to render the TableRow component, this is a default TableRow called
 * from the Table Component. default Columns can either be created from data or with rowProps.
 * @class
 * @param {TableRow~propTypes} props - TableRow props.
 * @returns {ReactElement}
 */
const TableRow = props => {
  const {
    rowData,
    children,
    className,
    tableCellClassName,
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

TableRow.propTypes = {
  rowData: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  tableCellClassName: PropTypes.string,
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
 * @class
 * @param {TableHeaderCell~propTypes} props - TableHeaderCell props.
 * @returns {ReactElement}
 */
const TableHeaderCell = props => {
  const { headerCelldata, children, className, ...otherProps } = props;

  const headerClasses = classnames('table-header-cell', className);
  let headerLabel = headerCelldata;
  let htmlProps = {};
  if (typeof headerLabel === 'object') {
    const { label, ...remProps } = headerCelldata;
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

TableHeaderCell.propTypes = {
  headerCelldata: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      label: PropTypes.string.isRequired
    })
  ]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

TableHeaderCell.defaultProps = {
  headerCelldata: '',
  className: '',
  children: null
};

/**
 * TableHeader component contains native tr tag implementation and is generally a Default Header component which renders the Header for the Table.
 * @class
 * @param {TableHeader~propTypes} props - TableHeader props.
 * @returns {ReactElement}
 */
const TableHeader = props => {
  const { header, children, className, tableHeaderCellClassName, ...otherProps } = props;
  const tableHeaderClasses = classnames('table-header', className);
  const allChild = React.Children.toArray(children);
  return (
    <tr className={tableHeaderClasses}>
      {(children && allChild.map(child => React.cloneElement(child, { ...otherProps }))) ||
        header.map((headerCelldata, idx) => (
          <TableHeaderCell
            headerCelldata={headerCelldata}
            key={`header-cell-${idx}`}
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
    tableClassName,
    tableHeaderClassName,
    tableHeaderCellClassName,
    tableRowClassName,
    tableBodyClassName,
    rowProps,
    tableCellClassName,
    ...otherProps
  } = props;
  const RowComponent = customRow || TableRow;
  const HeaderComponent = customHeader || TableHeader;
  const tableClasses = classnames('default-table', tableClassName);

  return (
    <div className="table-wrapper">
      <table className={tableClasses}>
        {header && (
          <thead className="table-head">
            <HeaderComponent
              header={header}
              className={tableHeaderClassName}
              tableHeaderCellClassName={tableHeaderCellClassName}
              {...otherProps}
            />
          </thead>
        )}
        <tbody className={classnames('table-body', tableBodyClassName)}>
          {rowsData.map((rowData, index) => (
            <RowComponent
              rowData={rowData}
              key={`row-${index}`}
              className={tableRowClassName}
              rowProps={rowProps}
              tableCellClassName={tableCellClassName}
              {...otherProps}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  header: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])),
  customRow: PropTypes.func,
  customHeader: PropTypes.func,
  tableClassName: PropTypes.string,
  tableHeaderClassName: PropTypes.string,
  tableHeaderCellClassName: PropTypes.string,
  tableRowClassName: PropTypes.string,
  tableCellClassName: PropTypes.string,
  tableBodyClassName: PropTypes.string,
  rowProps: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.instanceOf(Object))
  })
};

Table.defaultProps = {
  header: null,
  customRow: null,
  customHeader: null,
  tableClassName: '',
  tableHeaderClassName: '',
  tableHeaderCellClassName: '',
  tableRowClassName: '',
  tableCellClassName: '',
  tableBodyClassName: '',
  rowProps: {
    columns: []
  }
};
export { Table, TableHeader, TableHeaderCell, TableRow, TableCell };

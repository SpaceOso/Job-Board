import * as React from 'react';

import './DataTable.scss';
import DataTableNavigation from './navigation/DataTableNavigation';

interface MyProps {
  rowData: any;
  columnInfo: any;
  handleClick: any;
  totalRows: number;
  specialClasses: any | null;
  itemId: string;
}

interface MyState {
  pages: any[];
  currentPage: number;
  activeDataRow: any;
}

class DataTable extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      currentPage: 0,
      activeDataRow: '',
    };

    this.createHeaders = this.createHeaders.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createRowData = this.createRowData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.setPages = this.setPages.bind(this);
  }

  componentDidMount() {
    this.setPages();
  }

  setPages() {
    // set to the total rows displayed per page
    let innerCount = this.props.totalRows;
    let totalPages = 0;
    const pageList: any[] = [];
    // pageList will contain an array of dataObjs to be displayed per page
    pageList[ totalPages ] = [];
    this.props.rowData.map((dataObj, index) => {

      pageList[ totalPages ].push(dataObj);

      if (index === innerCount - 1) {
        innerCount += this.props.totalRows;
        if (this.props.rowData.length - 1 > index) {
          totalPages += 1;
          pageList[ totalPages ] = [];
        }
      }
    });
    this.setState({ pages: pageList.slice(0) });
  }

  componentDidUpdate(nextProps) {

    const a1 = nextProps.rowData;
    const a2 = this.props.rowData;
    if (a1.length !== a2.length && a1.every((v, i) => v !== a2[ i ])) {
      this.setState({ currentPage: 0 });
      this.setPages();
    }
  }

  createHeaders() {
    return this.props.columnInfo.map(column => <th key={column.header} data-column={column.header}>{column.header}</th>);
  }

  createRowData(rowObj) {
    return this.props.columnInfo.map((column, value) => {

      if (column.join !== undefined && column.join === true) {

        const combinedDataArr: string[] = [];

        for (let i = 0; i < column.properties.length; i += 1) {
          if (column.properties[ i ].includes('.')) {
            const dividedString = column.properties[ i ].split('.');
            const key = dividedString[ 0 ];
            const value = dividedString[ 1 ];
            combinedDataArr.push(rowObj[ key ][ value ]);
          } else {
            combinedDataArr.push(rowObj[ column.properties[ i ] ]);
          }
        }

        return <td key={`${rowObj.id}${value}`} data-column={column.property}>{combinedDataArr.join(column.connector ? column.connector : ' ')}</td>;
      }

      if (column.special !== undefined) {
        if (column.special === 'count') {
          console.log('prop..', column.property);
          return <td key={`${rowObj.id}${value}`} data-column={column.property}>{rowObj[ column.property ].length}</td>;
        }
      }

      return <td key={`${rowObj.id}${value}`} data-column={column.property}>{rowObj[ column.property ]}</td>;
    });
  }

  changeCurrentPage(newPage: number | string) {
    let currentPage = this.state.currentPage;

    if (typeof newPage === 'string') {
      if (newPage === 'next') {
        currentPage += 1;
      } else if (newPage === 'prev') {
        currentPage -= 1;
      }
      if (currentPage >= 0 && currentPage < this.state.pages.length) {
        this.setState({ currentPage });
      }
    } else {
      this.setState({ currentPage: newPage });
    }
  }

  onClick(dataObj, event) {
    this.props.handleClick(dataObj);
    this.setState({ activeDataRow: dataObj });
  }

  createRows() {
    if (this.state.pages.length <= 0) {
      return;
    }

    return this.state.pages[ this.state.currentPage ].map((rowObj, index) => {
      // TODO need to paginate this component by creating a prop that handles how many pages there should be per data table
      if (index > this.props.totalRows) {
        console.log('we should have created another page!!!');
      }

      let specialClassName = '';

      // if there is a special class it will add it to every row where the property matches the specialClass key
      if (this.props.specialClasses !== null) {
        specialClassName = this.props.specialClasses[ rowObj.interest ];
      }

      return (
        <tr
          className={rowObj.id === this.state.activeDataRow.id ? `data-row selected ${specialClassName}` : `data-row ${specialClassName}`}
          key={rowObj.id}
          onClick={(event) => this.onClick(rowObj, event)}
        >
          {this.createRowData(rowObj)}
        </tr>
      );
    });
  }

  render() {

    return (
      <div>
        <table className="data-table">
          <tbody>
          <tr key="headers">
            {this.createHeaders()}
          </tr>
          {this.createRows()}
          </tbody>
        </table>
        {this.state.pages.length > 1 ? <DataTableNavigation currentPage={this.state.currentPage} totalPages={this.state.pages.length} updatePage={this.changeCurrentPage}/> : null}
      </div>
    );
  }
}

export default DataTable;

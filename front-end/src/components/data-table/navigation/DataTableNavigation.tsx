import * as React from 'react';

import './DataNavigation.scss';

interface MyProps {
  currentPage: number;
  totalPages: number;
  updatePage: (newPage) => void;
}

interface MyState {
  currentSection: number;
  totalSections: number;
  activePage?: number;
}

class DataTableNavigation extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      currentSection: 0,
      totalSections: 0,
      activePage: this.props.currentPage,
    };

    this.createButtons = this.createButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createPageButtonSections = this.createPageButtonSections.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.cratePrevSectionButton = this.cratePrevSectionButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /**
     * Creates sections based on the amount of pages. If we have more pages than before create new sections.
     */
    if (nextProps.totalPages !== this.props.totalPages && nextProps.totalPages !== 0) {
      this.setState({ totalSections: Math.ceil(nextProps.totalPages / 4) });
    }

    if (nextProps.currentPage !== this.state.activePage) {
      this.setState({ activePage: nextProps.currentPage });
      // checking to see if the current page is within the current section
      for (let i = 1; i < this.state.totalSections + 1; i += 1) {

        // if nextProps.currentPage falls inside the page range of this currentSection
        if (nextProps.currentPage < (i * 4)) {
          // If we are not in the section where the currentPage falls under, change state to that section
          if (this.state.currentSection !== i - 1) {
            this.setState({ currentSection: i - 1 });
            break;
          } else {
            break;
          }
        }
      }
    }
  }

  updateSection = (event: React.MouseEvent<HTMLElement>) => {
    const eventId: string = event.currentTarget.id;
    const currentSection: number = this.state.currentSection;
    if (eventId === 'section-next') {
      this.setState({ currentSection: currentSection + 1 });
    }
    if (eventId === 'section-prev') {
      this.setState({ currentSection: currentSection - 1 });
    }
  }

  componentDidMount() {
    const totalPages = Number((this.props.totalPages / 4).toFixed());
    this.setState({ totalSections: totalPages });
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = parseInt(event.currentTarget.id, 10);

    if (Number.isNaN(id)) {
      this.props.updatePage(event.currentTarget.id);
    } else {
      this.props.updatePage(id);
    }
  }

  createPrevButton(): JSX.Element {
    return (
      <div
        key={'prev-btn'}
        id={'prev'}
        className="data-nav-button"
        onClick={this.handleClick}
      >
        <i className="fa fa-arrow-left" aria-hidden="true"/>
        Prev
      </div>);
  }

  cratePrevSectionButton(): JSX.Element {
    return (
      <div
        className={'data-nav-button'}
        key={'section-prev-btn'}
        id={'section-prev'}
        onClick={this.updateSection}
      >
        ...
      </div>
    );
  }

  createNextButton(): JSX.Element {
    return (
      <div
        className="data-nav-button"
        key={'next-btn'}
        id={'next'}
        onClick={this.handleClick}
      >
        Next
        <i className="fa fa-arrow-right" aria-hidden="true"/>
      </div>
    );
  }

  createNextSectionButton(): JSX.Element {
    return (
      <div
        className={'data-nav-button'}
        key={'section-btn'}
        id={'section-next'}
        onClick={this.updateSection}
      >
        ...
      </div>
    );
  }

  createPageButtonSections(): JSX.Element[][] | null {
    if (this.props.totalPages <= 1) {
      return null;
    }
    const pageButtons: JSX.Element[][] = [];
    let sectionCount = 0;
    let pageCount = 0;
    pageButtons[ sectionCount ] = [];

    for (let i = 0; i < this.props.totalPages; i += 1) {
      pageButtons[ sectionCount ].push(
        <div
          key={`page-${i}`}
          id={`${i}`}
          onClick={this.handleClick}
          className={this.props.currentPage === i ? 'data-nav-button active' : 'data-nav-button'}
        >
          {i + 1}
        </div>,
      );

      pageCount = pageCount + 1;
      if (pageCount >= 4) {
        pageCount = 0;
        sectionCount = sectionCount + 1;
        pageButtons[ sectionCount ] = [];
      }
    }
    return pageButtons;
  }

  createButtons(): JSX.Element[] | null {
    if (this.props.totalPages <= 1) {
      return null;
    }
    const prevButtonSet: any = [];
    const nextButtonSet: any = [];
    const pageButtons = this.createPageButtonSections();
    if (pageButtons === null) {
      return null;
    }
    prevButtonSet.push(this.createPrevButton());

    // This checks if we need a previous section and if we should display it
    if (this.state.totalSections > 1 && this.state.currentSection !== 0) {
      prevButtonSet.push(this.cratePrevSectionButton());
    }

    // This will add the next ... button
    if (this.props.totalPages > 4 && this.state.currentSection !== this.state.totalSections - 1) {
      nextButtonSet.push(this.createNextSectionButton());
    }

    // This creates the next page button
    nextButtonSet.push(this.createNextButton());

    return prevButtonSet.concat(pageButtons[ this.state.currentSection ], nextButtonSet);

  }

  render() {
    return (
      <div className="data-nav-container">
        {this.createButtons()}
      </div>
    );
  }
}

export default DataTableNavigation;

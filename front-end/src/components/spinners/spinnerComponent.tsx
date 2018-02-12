import * as React from 'react';

import './styles/SpinnerComponent.scss';

function spinnerComponent(): JSX.Element {
  return (
    <div className="spinner-component">
      <div className="loader">
        Loading your data...
      </div>
    </div>
  );
}

export default spinnerComponent;

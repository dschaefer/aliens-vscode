import * as React from 'react';
import { Provider, observer } from 'mobx-react';
import { Canvas } from './components/Canvas';
import { Store } from './store';

@observer
export default class App extends React.Component {
    private store = new Store();

    render() {
        return (
            <div>
                <Provider store={this.store}>
                    <Canvas/>
                </Provider>
            </div>
        );
    }
}
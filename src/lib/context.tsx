import * as React from 'react';

export function contextConnect(Context: React.Context<{}>, mapProvider: (context: any) => object) {
    return (Component: any) => {
        return class WrappedComponent extends React.Component<any> {
            static displayName = `withContext(${Component.displayName})`;

            render() {
                return (
                    <Context.Consumer>
                        {(context: any) => {
                            const props = mapProvider(context);
                            return <Component {...this.props} {...props} />;
                        }}
                    </Context.Consumer>
                );
            }
        };
    };
}

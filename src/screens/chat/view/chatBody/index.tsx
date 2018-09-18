import { lifecycle, compose, ComponentEnhancer as CE } from 'recompose';

// UI Element
import { ChatBody, Props } from './body';

const enhanced: CE<{ items: any }, Props> = compose(
    lifecycle({
        componentDidMount() {
            // @ts-ignore
            this.props.subscribe();
        }
    })
);

export default enhanced(ChatBody);

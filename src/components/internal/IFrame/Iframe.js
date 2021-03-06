import { Component, h } from 'preact';

class Iframe extends Component {
    static defaultProps = {
        width: '0',
        height: '0',
        minWidth: '0',
        minHeight: '0',
        border: '0',
        src: null,
        allow: null,
        title: 'components iframe'
    };

    iframeOnLoad() {
        if (this.props.callback && typeof this.props.callback === 'function') {
            this.props.callback(this.iframeEl.contentWindow);
        }
    }

    componentDidMount() {
        if (this.iframeEl.addEventListener) {
            this.iframeEl.addEventListener('load', this.iframeOnLoad.bind(this), false);
        } else if (this.iframeEl.attachEvent) {
            // IE fallback
            this.iframeEl.attachEvent('onload', this.iframeOnLoad.bind(this));
        } else {
            this.iframeEl.onload = this.iframeOnLoad.bind(this);
        }
    }

    componentWillUnmount() {
        if (this.iframeEl.removeEventListener) {
            this.iframeEl.removeEventListener('load', this.iframeOnLoad.bind(this), false);
        } else if (this.iframeEl.detachEvent) {
            // IE fallback
            this.iframeEl.detachEvent('onload', this.iframeOnLoad.bind(this));
        } else {
            this.iframeEl.onload = null;
        }
    }

    render({ name, src, width, height, minWidth, minHeight, border, allow, title }) {
        return (
            <iframe
                ref={ref => {
                    this.iframeEl = ref;
                }}
                allow={allow}
                className={`adyen-checkout__iframe adyen-checkout__iframe--${name}`}
                name={name}
                src={src}
                width={width}
                height={height}
                min-width={minWidth}
                min-heigth={minHeight}
                border={border}
                style={{ border: 0 }}
                frameBorder="0"
                title={title}
                referrerpolicy="origin"
            />
        );
    }
}

export default Iframe;

import React, { PropTypes } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';


const Tag = ({
  label,
}) => {
  const tag = (
    <View style={[styles.tag]}>
      <Text style={[styles.tagLabel]}>
        {label}
      </Text>
    </View>
  );
  return tag;
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
};


class Tags extends React.Component {
  constructor(props) {
    super(props);

    const {
      initialTags = [],
      initialText = ' ',
    } = props;

    this.state = {
      tags: initialTags,
      text: initialText,
    };

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    if (text.length === 0) {
      /* `onKeyPress` isn't currently supported on Android; I've placed an extra
        space character at the start of `TextInput` which is used to determine if the
        user is erasing.
      */
      this.setState({
        tags: this.state.tags.slice(0, -1),
        text: this.state.tags.slice(-1)[0] || ' ',
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags));
    } else if (
      text.length > 1 &&
      (text.slice(-1) === ' ' || text.slice(-1) === ',')
    ) {
      this.setState({
        tags: [...this.state.tags, text.slice(0, -1).trim()],
        text: ' ',
      }, () => this.props.onChangeTags && this.props.onChangeTags(this.state.tags));
      ;
    } else {
      this.setState({ text });
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this.state.tags.map((tag, i) => (
          <Tag
            key={i}
            label={tag}
            onPress={this.props.onTagPress}
          />)
        )}
        <View style={[styles.textInputContainer]}>
          <TextInput
            value={this.state.text}
            style={[styles.textInput]}
            onChangeText={this.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}
Tags.propTypes = {
  initialText: PropTypes.string,
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTags: PropTypes.func,
};


export { Tag };
export default Tags;

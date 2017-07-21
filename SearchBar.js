import React from 'react';
import { View, TextInput, Text, TouchableHighlight, StyleSheet} from 'react-native';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleTextChange(text) {
        this.setState({text});
    }
    handlePress() {
        const {text} = this.state;
        this.props.onSearch(text)
    }
    render () {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={this.handleTextChange.bind(this)}
                    value={this.state.text}
                    underlineColorAndroid="rgb(170,210, 255)"
                    selectionColor="rgb(170,210, 255)"
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handlePress.bind(this)}
                >
                    <Text style={styles.buttonText}>Keressé'</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // flexbox
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        height: 30,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        padding: 5,
        borderColor: 'rgb(170,210, 255)',
    },
    button: {
        height: 30,
        backgroundColor: 'rgb(170,210, 255)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    buttonText: {
        color: 'rgb(255,0,0)'
    }
});


export default SearchBar;
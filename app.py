from flask import Flask, render_template, request, session

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Needed to use sessions in Flask

def get_chatgpt_response(user_input):
    # In a real ChatGPT application, you'd use OpenAI API here.
    # For simplicity, we'll return predefined responses.
    responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you?": "I'm doing well, thank you for asking!",
        "bye": "Goodbye! Have a great day!",
    }
    return responses.get(user_input.lower(), "Sorry, I didn't understand that.")

@app.route('/')
def home():
    # Initialize an empty list for messages if it doesn't exist yet
    if 'messages' not in session:
        session['messages'] = []
    
    return render_template('index.html', messages=session['messages'])

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['message']
    bot_response = get_chatgpt_response(user_message)
    
    # Retrieve the messages from the session
    messages = session.get('messages', [])
    
    # Append the new user and bot messages as tuples
    messages.append((user_message, 'user'))
    messages.append((bot_response, 'bot'))
    
    # Update the session with the new messages list
    session['messages'] = messages
    
    return render_template('index.html', messages=messages)


if __name__ == "__main__":
    app.run(debug=True)

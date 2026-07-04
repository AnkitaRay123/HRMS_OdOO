from app import create_app

app = create_app()

if __name__ == '__main__':
    # Run the Flask app on host 0.0.0.0 and port 4000
    app.run(host='0.0.0.0', port=app.config['PORT'], debug=app.config['DEBUG'])

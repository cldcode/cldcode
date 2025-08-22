from flask import Flask, request, jsonify
app = Flask(__name__)

BAD_WORDS = ['广告','推广','赌博']

@app.route('/api/popup/check', methods=['POST'])
def check():
    text = (request.json or {}).get('text','')
    matched = next((w for w in BAD_WORDS if w in text), None)
    return jsonify({"verdict": "bad" if matched else "good", "matched": matched, "confidence": 0.95 if matched else 0.5})

if __name__ == '__main__':
    app.run(port=5200)

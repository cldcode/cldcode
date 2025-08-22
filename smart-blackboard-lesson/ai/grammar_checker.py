from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/ai/spellcheck', methods=['POST'])
def spellcheck():
    data = request.json or {}
    text = data.get('text','')
    # stub：返回原文与一个示例建议
    return jsonify({
        "original": text,
        "suggestions": [
            {"start":0,"end":len(text),"suggested_text": text, "note":"stub - integrate real model"}
        ]
    })

if __name__ == '__main__':
    app.run(port=5001)

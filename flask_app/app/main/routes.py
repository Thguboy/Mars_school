from flask import render_template, session
from app.main import bp
from app.utils import init_session

@bp.route('/')
@bp.route('/index')
def index():
    init_session(session)
    return render_template('index.html')

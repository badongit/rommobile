import {all} from 'axios';
import watchGetMe from './get-me.saga';
import watchLogin from './login.saga';
import watchLogout from './logout.saga';

export default function* authSagas() {
  yield all([watchLogin(), watchLogout(), watchGetMe()]);
}

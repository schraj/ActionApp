import getBabelRelayPlugin from 'babel-relay-plugin';
import schema from '../api/schema.json';

export default getBabelRelayPlugin(schema.data);

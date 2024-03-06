import { Connection } from 'amqplib';
import { MockConnection } from '../util/MockChannel.spec';
import { getChannel } from './channel';

describe('getChannel', () => {
  let connection: MockConnection;

  beforeEach(() => {
    connection = new MockConnection();
  });

  it('should create a channel', async () => {
    const channel = await getChannel(connection as unknown as Connection, 'queue');
    expect(channel).toBeDefined();
    expect(connection.createChannel).toHaveBeenCalled();
    expect(connection.channel.assertQueue).toHaveBeenCalledWith('queue', { durable: true });
  });
});
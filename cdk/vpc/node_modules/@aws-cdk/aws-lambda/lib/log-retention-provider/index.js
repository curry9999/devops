"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
const AWS = require("aws-sdk");
/**
 * Creates a log group and doesn't throw if it exists.
 *
 * @param logGroupName the name of the log group to create
 */
async function createLogGroupSafe(logGroupName) {
    try { // Try to create the log group
        const cloudwatchlogs = new AWS.CloudWatchLogs({ apiVersion: '2014-03-28' });
        await cloudwatchlogs.createLogGroup({ logGroupName }).promise();
    }
    catch (e) {
        if (e.code !== 'ResourceAlreadyExistsException') {
            throw e;
        }
    }
}
/**
 * Puts or deletes a retention policy on a log group.
 *
 * @param logGroupName the name of the log group to create
 * @param retentionInDays the number of days to retain the log events in the specified log group.
 */
async function setRetentionPolicy(logGroupName, retentionInDays) {
    const cloudwatchlogs = new AWS.CloudWatchLogs({ apiVersion: '2014-03-28' });
    if (!retentionInDays) {
        await cloudwatchlogs.deleteRetentionPolicy({ logGroupName }).promise();
    }
    else {
        await cloudwatchlogs.putRetentionPolicy({ logGroupName, retentionInDays }).promise();
    }
}
async function handler(event, context) {
    try {
        console.log(JSON.stringify(event));
        // The target log group
        const logGroupName = event.ResourceProperties.LogGroupName;
        if (event.RequestType === 'Create' || event.RequestType === 'Update') {
            // Act on the target log group
            await createLogGroupSafe(logGroupName);
            await setRetentionPolicy(logGroupName, parseInt(event.ResourceProperties.RetentionInDays, 10));
            if (event.RequestType === 'Create') {
                // Set a retention policy of 1 day on the logs of this function. The log
                // group for this function should already exist at this stage because we
                // already logged the event but due to the async nature of Lambda logging
                // there could be a race condition. So we also try to create the log group
                // of this function first. If multiple LogRetention constructs are present
                // in the stack, they will try to act on this function's log group at the
                // same time. This can sometime result in an OperationAbortedException. To
                // avoid this and because this operation is not critical we catch all errors.
                try {
                    await createLogGroupSafe(`/aws/lambda/${context.functionName}`);
                    await setRetentionPolicy(`/aws/lambda/${context.functionName}`, 1);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        await respond('SUCCESS', 'OK', logGroupName);
    }
    catch (e) {
        console.log(e);
        await respond('FAILED', e.message, event.ResourceProperties.LogGroupName);
    }
    function respond(responseStatus, reason, physicalResourceId) {
        const responseBody = JSON.stringify({
            Status: responseStatus,
            Reason: reason,
            PhysicalResourceId: physicalResourceId,
            StackId: event.StackId,
            RequestId: event.RequestId,
            LogicalResourceId: event.LogicalResourceId,
            Data: {}
        });
        console.log('Responding', responseBody);
        const parsedUrl = require('url').parse(event.ResponseURL);
        const requestOptions = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.path,
            method: 'PUT',
            headers: { 'content-type': '', 'content-length': responseBody.length }
        };
        return new Promise((resolve, reject) => {
            try {
                const request = require('https').request(requestOptions, resolve);
                request.on('error', reject);
                request.write(responseBody);
                request.end();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUM1QiwrQkFBZ0M7QUFFaEM7Ozs7R0FJRztBQUNILEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxZQUFvQjtJQUNwRCxJQUFJLEVBQUUsOEJBQThCO1FBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDakU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxnQ0FBZ0MsRUFBRTtZQUMvQyxNQUFNLENBQUMsQ0FBQztTQUNUO0tBQ0Y7QUFDSCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxLQUFLLFVBQVUsa0JBQWtCLENBQUMsWUFBb0IsRUFBRSxlQUF3QjtJQUM5RSxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUM1RSxJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLE1BQU0sY0FBYyxDQUFDLHFCQUFxQixDQUFDLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN4RTtTQUFNO1FBQ0wsTUFBTSxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0RjtBQUNILENBQUM7QUFFTSxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQWtELEVBQUUsT0FBMEI7SUFDMUcsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFL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LE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQXJFRCwwQkFxRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlXG5pbXBvcnQgQVdTID0gcmVxdWlyZSgnYXdzLXNkaycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBsb2cgZ3JvdXAgYW5kIGRvZXNuJ3QgdGhyb3cgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSBsb2dHcm91cE5hbWUgdGhlIG5hbWUgb2YgdGhlIGxvZyBncm91cCB0byBjcmVhdGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTG9nR3JvdXBTYWZlKGxvZ0dyb3VwTmFtZTogc3RyaW5nKSB7XG4gIHRyeSB7IC8vIFRyeSB0byBjcmVhdGUgdGhlIGxvZyBncm91cFxuICAgIGNvbnN0IGNsb3Vkd2F0Y2hsb2dzID0gbmV3IEFXUy5DbG91ZFdhdGNoTG9ncyh7IGFwaVZlcnNpb246ICcyMDE0LTAzLTI4JyB9KTtcbiAgICBhd2FpdCBjbG91ZHdhdGNobG9ncy5jcmVhdGVMb2dHcm91cCh7IGxvZ0dyb3VwTmFtZSB9KS5wcm9taXNlKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZS5jb2RlICE9PSAnUmVzb3VyY2VBbHJlYWR5RXhpc3RzRXhjZXB0aW9uJykge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBQdXRzIG9yIGRlbGV0ZXMgYSByZXRlbnRpb24gcG9saWN5IG9uIGEgbG9nIGdyb3VwLlxuICpcbiAqIEBwYXJhbSBsb2dHcm91cE5hbWUgdGhlIG5hbWUgb2YgdGhlIGxvZyBncm91cCB0byBjcmVhdGVcbiAqIEBwYXJhbSByZXRlbnRpb25JbkRheXMgdGhlIG51bWJlciBvZiBkYXlzIHRvIHJldGFpbiB0aGUgbG9nIGV2ZW50cyBpbiB0aGUgc3BlY2lmaWVkIGxvZyBncm91cC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2V0UmV0ZW50aW9uUG9saWN5KGxvZ0dyb3VwTmFtZTogc3RyaW5nLCByZXRlbnRpb25JbkRheXM/OiBudW1iZXIpIHtcbiAgY29uc3QgY2xvdWR3YXRjaGxvZ3MgPSBuZXcgQVdTLkNsb3VkV2F0Y2hMb2dzKHsgYXBpVmVyc2lvbjogJzIwMTQtMDMtMjgnIH0pO1xuICBpZiAoIXJldGVudGlvbkluRGF5cykge1xuICAgIGF3YWl0IGNsb3Vkd2F0Y2hsb2dzLmRlbGV0ZVJldGVudGlvblBvbGljeSh7IGxvZ0dyb3VwTmFtZSB9KS5wcm9taXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgY2xvdWR3YXRjaGxvZ3MucHV0UmV0ZW50aW9uUG9saWN5KHsgbG9nR3JvdXBOYW1lLCByZXRlbnRpb25JbkRheXMgfSkucHJvbWlzZSgpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBBV1NMYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50LCBjb250ZXh0OiBBV1NMYW1iZGEuQ29udGV4dCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XG5cbiAgICAvLyBUaGUgdGFyZ2V0IGxvZyBncm91cFxuICAgIGNvbnN0IGxvZ0dyb3VwTmFtZSA9IGV2ZW50LlJlc291cmNlUHJvcGVydGllcy5Mb2dHcm91cE5hbWU7XG5cbiAgICBpZiAoZXZlbnQuUmVxdWVzdFR5cGUgPT09ICdDcmVhdGUnIHx8IGV2ZW50LlJlcXVlc3RUeXBlID09PSAnVXBkYXRlJykge1xuICAgICAgLy8gQWN0IG9uIHRoZSB0YXJnZXQgbG9nIGdyb3VwXG4gICAgICBhd2FpdCBjcmVhdGVMb2dHcm91cFNhZmUobG9nR3JvdXBOYW1lKTtcbiAgICAgIGF3YWl0IHNldFJldGVudGlvblBvbGljeShsb2dHcm91cE5hbWUsIHBhcnNlSW50KGV2ZW50LlJlc291cmNlUHJvcGVydGllcy5SZXRlbnRpb25JbkRheXMsIDEwKSk7XG5cbiAgICAgIGlmIChldmVudC5SZXF1ZXN0VHlwZSA9PT0gJ0NyZWF0ZScpIHtcbiAgICAgICAgLy8gU2V0IGEgcmV0ZW50aW9uIHBvbGljeSBvZiAxIGRheSBvbiB0aGUgbG9ncyBvZiB0aGlzIGZ1bmN0aW9uLiBUaGUgbG9nXG4gICAgICAgIC8vIGdyb3VwIGZvciB0aGlzIGZ1bmN0aW9uIHNob3VsZCBhbHJlYWR5IGV4aXN0IGF0IHRoaXMgc3RhZ2UgYmVjYXVzZSB3ZVxuICAgICAgICAvLyBhbHJlYWR5IGxvZ2dlZCB0aGUgZXZlbnQgYnV0IGR1ZSB0byB0aGUgYXN5bmMgbmF0dXJlIG9mIExhbWJkYSBsb2dnaW5nXG4gICAgICAgIC8vIHRoZXJlIGNvdWxkIGJlIGEgcmFjZSBjb25kaXRpb24uIFNvIHdlIGFsc28gdHJ5IHRvIGNyZWF0ZSB0aGUgbG9nIGdyb3VwXG4gICAgICAgIC8vIG9mIHRoaXMgZnVuY3Rpb24gZmlyc3QuIElmIG11bHRpcGxlIExvZ1JldGVudGlvbiBjb25zdHJ1Y3RzIGFyZSBwcmVzZW50XG4gICAgICAgIC8vIGluIHRoZSBzdGFjaywgdGhleSB3aWxsIHRyeSB0byBhY3Qgb24gdGhpcyBmdW5jdGlvbidzIGxvZyBncm91cCBhdCB0aGVcbiAgICAgICAgLy8gc2FtZSB0aW1lLiBUaGlzIGNhbiBzb21ldGltZSByZXN1bHQgaW4gYW4gT3BlcmF0aW9uQWJvcnRlZEV4Y2VwdGlvbi4gVG9cbiAgICAgICAgLy8gYXZvaWQgdGhpcyBhbmQgYmVjYXVzZSB0aGlzIG9wZXJhdGlvbiBpcyBub3QgY3JpdGljYWwgd2UgY2F0Y2ggYWxsIGVycm9ycy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjcmVhdGVMb2dHcm91cFNhZmUoYC9hd3MvbGFtYmRhLyR7Y29udGV4dC5mdW5jdGlvbk5hbWV9YCk7XG4gICAgICAgICAgYXdhaXQgc2V0UmV0ZW50aW9uUG9saWN5KGAvYXdzL2xhbWJkYS8ke2NvbnRleHQuZnVuY3Rpb25OYW1lfWAsIDEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBhd2FpdCByZXNwb25kKCdTVUNDRVNTJywgJ09LJywgbG9nR3JvdXBOYW1lKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgYXdhaXQgcmVzcG9uZCgnRkFJTEVEJywgZS5tZXNzYWdlLCBldmVudC5SZXNvdXJjZVByb3BlcnRpZXMuTG9nR3JvdXBOYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc3BvbmQocmVzcG9uc2VTdGF0dXM6IHN0cmluZywgcmVhc29uOiBzdHJpbmcsIHBoeXNpY2FsUmVzb3VyY2VJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzcG9uc2VCb2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgU3RhdHVzOiByZXNwb25zZVN0YXR1cyxcbiAgICAgIFJlYXNvbjogcmVhc29uLFxuICAgICAgUGh5c2ljYWxSZXNvdXJjZUlkOiBwaHlzaWNhbFJlc291cmNlSWQsXG4gICAgICBTdGFja0lkOiBldmVudC5TdGFja0lkLFxuICAgICAgUmVxdWVzdElkOiBldmVudC5SZXF1ZXN0SWQsXG4gICAgICBMb2dpY2FsUmVzb3VyY2VJZDogZXZlbnQuTG9naWNhbFJlc291cmNlSWQsXG4gICAgICBEYXRhOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ1Jlc3BvbmRpbmcnLCByZXNwb25zZUJvZHkpO1xuXG4gICAgY29uc3QgcGFyc2VkVXJsID0gcmVxdWlyZSgndXJsJykucGFyc2UoZXZlbnQuUmVzcG9uc2VVUkwpO1xuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgaG9zdG5hbWU6IHBhcnNlZFVybC5ob3N0bmFtZSxcbiAgICAgIHBhdGg6IHBhcnNlZFVybC5wYXRoLFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICcnLCAnY29udGVudC1sZW5ndGgnOiByZXNwb25zZUJvZHkubGVuZ3RoIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCdodHRwcycpLnJlcXVlc3QocmVxdWVzdE9wdGlvbnMsIHJlc29sdmUpO1xuICAgICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICAgIHJlcXVlc3Qud3JpdGUocmVzcG9uc2VCb2R5KTtcbiAgICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=
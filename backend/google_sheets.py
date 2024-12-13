import os
import json
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle

# The ID and range of the spreadsheet.
SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1UF0MqggkcOFl73d1hPo7BvNFDCHP6LYKqcgicrE5zfE/edit?gid=0#gid=0'  # Replace with your Spreadsheet ID
RANGE_NAME = 'Sheet1!A:B'  # Update range as needed

# If modifying the spreadsheet, the scope should allow editing
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Authenticate with Google Sheets API
def authenticate_google_sheets():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    return build('sheets', 'v4', credentials=creds)

def append_to_sheet(email, contact):
    service = authenticate_google_sheets()
    sheet = service.spreadsheets()

    # Append data to the sheet
    values = [[email, contact]]
    body = {'values': values}
    
    # Call the Sheets API to append the data
    result = sheet.values().append(
        spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME,
        valueInputOption='RAW', body=body).execute()
    
    return result


#!/bin/sh
# Script to run a MusicML file with options
# Check if a MML file path is provided
if [ "$#" -lt 1 ]; then
    echo "Error: No MML file path provided."
    echo "Usage: sh run.sh \"path/to/mml/file.mml\" [-d=\"path/to/destination\"] [-j] [-w] [-mt]"
    exit 1
fi

# Extract command-line arguments
MML_FILE_PATH=$1
shift  # Shift arguments to left
DESTINATION_PATH="./"  # Default destination path
JSON_FLAG=""
WEB_FLAG=""
MULTI_TRACK_FLAG=""

# Parse additional options
while [ "$#" -gt 0 ]; do
    case "$1" in
        -d=*|--destination=*)
            DESTINATION_PATH="${1#*=}"
            ;;
        -j|--json)
            JSON_FLAG="-j"
            ;;
        -w|--web)
            WEB_FLAG="-w"
            ;;
        -mt|--multi-track)
            MULTI_TRACK_FLAG="-mt"
            ;;
        *)
            echo "Error: Invalid option $1"
            exit 1
            ;;
    esac
    shift
done

# Run the application with the parsed options
./midi-dsl/bin/cli.js generate "$MML_FILE_PATH" -d="$DESTINATION_PATH" $JSON_FLAG $WEB_FLAG $MULTI_TRACK_FLAG
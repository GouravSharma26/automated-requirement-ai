from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def process_requirement(request):
    user_input = request.data.get("input", "")

    # TODO: Implement AI-based processing here (for now, just return the input)
    processed_requirement = f"Processed Requirement: {user_input}"

    return Response({"requirement": processed_requirement})
